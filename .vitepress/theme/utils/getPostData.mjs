import { generateId } from "./commonTools.mjs";
import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";

/**
 * 获取 posts 目录下所有 Markdown 文件的路径
 * @returns {Promise<string[]>} - 文件路径数组
 */
const getPostMDFilePaths = async () => {
  try {
    // 获取所有 md 文件路径
    let paths = await globby(["**.md"], {
      ignore: ["node_modules", "pages", ".vitepress", "README.md"],
    });
    // 过滤路径，只包括 'posts' 目录下的文件
    return paths.filter((item) => item.includes("posts/"));
  } catch (error) {
    console.error("获取文章路径时出错:", error);
    throw error;
  }
};

/**
 * 用于基于 frontMatter 日期降序排序文章的比较函数
 * @param {Object} obj1 - 第一篇文章对象
 * @param {Object} obj2 - 第二篇文章对象
 * @returns {number} - 比较结果
 */
const compareDate = (obj1, obj2) => {
  return obj1.date < obj2.date ? 1 : -1;
};

/**
 * 获取所有文章，读取其内容并解析 front matter
 * @returns {Promise<Object[]>} - 文章对象数组
 */
export const getAllPosts = async () => {
  try {
    // 获取所有 Markdown 文件的路径
    let paths = await getPostMDFilePaths();
    // 读取和处理每个 Markdown 文件的内容
    let posts = await Promise.all(
      paths.map(async (item) => {
        try {
          // 读取文件内容
          const content = await fs.readFile(item, "utf-8");
          // 文件的元数据
          const stat = await fs.stat(item);
          // 获取文件创建时间和最后修改时间
          const { birthtimeMs, mtimeMs } = stat;
          // 解析 front matter
          const { data } = matter(content);
          const { title, date, categories, description, tags } = data;
          // 返回文章对象
          return {
            id: generateId(item),
            title: title || "未命名文章",
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            tags,
            categories,
            description,
            regularPath: `/${item.replace(".md", ".html")}`,
          };
        } catch (error) {
          console.error(`处理文章文件 '${item}' 时出错:`, error);
          throw error;
        }
      }),
    );
    // 根据日期排序文章
    posts.sort(compareDate);
    return posts;
  } catch (error) {
    console.error("获取所有文章时出错:", error);
    throw error;
  }
};

/**
 * 获取所有标签及其相关文章的统计信息
 * @param {Object[]} postData - 包含文章信息的数组
 * @returns {Object} - 包含标签统计信息的对象
 */
export const getAllType = (postData) => {
  const tagData = {};
  // 遍历数据
  postData.forEach((item) => {
    // 检查是否有 tags 属性
    if (item.tags && item.tags.length > 0) {
      // 遍历文章的每个标签
      item.tags.forEach((tag) => {
        // 初始化标签的统计信息，如果不存在
        if (!tagData[tag]) {
          tagData[tag] = {
            count: 1,
            articles: [item],
          };
        } else {
          // 如果标签已存在，则增加计数和记录所属文章
          tagData[tag].count++;
          tagData[tag].articles.push(item);
        }
      });
    }
  });
  return tagData;
};

/**
 * 获取所有分类及其相关文章的统计信息
 * @param {Object[]} postData - 包含文章信息的数组
 * @returns {Object} - 包含标签统计信息的对象
 */
export const getAllCategories = (postData) => {
  const catData = {};
  // 遍历数据
  postData.forEach((item) => {
    // 检查是否有 categories 属性
    if (item.categories && item.categories.length > 0) {
      // 遍历文章的每个标签
      item.categories.forEach((tag) => {
        // 初始化标签的统计信息，如果不存在
        if (!catData[tag]) {
          catData[tag] = {
            count: 1,
            articles: [item],
          };
        } else {
          // 如果标签已存在，则增加计数和记录所属文章
          catData[tag].count++;
          catData[tag].articles.push(item);
        }
      });
    }
  });
  return catData;
};