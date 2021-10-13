import stripIndent from "strip-indent";

import { generateRegexp } from "./utils";
import TemplateParser from "./templateParser";
/**
 * 根据文件内容获取的styleContent和templateContent
 *
 * @export
 * @param {*} fileContent
 */
export default (fileContent) => {
  let styleContent = "";
  let templateContent = "";
  let templateLang = "";
  let styleStartLine = 0; // 样式表开始行

  const lines = fileContent.match(/\n/g).length; // 文件总行数
  const styleRegExp = generateRegexp("style", "stylus");
  const templateRegExp = generateRegexp("template", "pug");

  let matched;
  matched = fileContent.match(styleRegExp);

  if (matched) {
    [, , styleContent] = matched;
  }
  let styleLines = 0;
  if (styleContent) {
    styleLines = styleContent.match(/\n/g).length; // 样式总行数
  }

  styleStartLine = lines - styleLines; // 起始行数

  matched = fileContent.match(templateRegExp);
  if (matched) {
    [, templateLang, templateContent] = matched;
  }

  // stripIndent 解决 stylue解析问题
  styleContent = styleContent && stripIndent(styleContent);

  // 解析templateContent为html
  if (templateContent) {
    // 加载所有的模板处理插件
    templateContent = new TemplateParser(
      templateContent,
      templateLang
    ).getContent();
  }

  return {
    styleContent,
    templateContent,
    styleStartLine,
  };
};
