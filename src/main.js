import fs from "fs";
import cheerio from "cheerio";
import { Parser } from "stylus";
import parserContent from "./parserContent";
import parseSelectorElement from "./ast";
import TemplateParser from "./templateParser";

/**
 * 根据.wpy文件路径来查找冗余css
 * 
 * @param {string} pathOrContent
 * @returns string[]
 */
function findInvalidCssByWpyFile(filepath) {
  if (!fs.existsSync(filepath)) {
    console.error("文件不存在");
    return [];
  }
  const content = fs.readFileSync(filepath, "utf8");
  return findInvalidCssByWpyContent(content)
}

/**
 * 根据wpy内容获取冗余css
 *
 * @param {*} content
 * @return {*} 
 */
function findInvalidCssByWpyContent(content) {
  const result = [];
  let html = '';
  let style = '';

  let styleNO = 0
  
  // 根据内容获取样式和模板内容
  if (content) {
    const { styleContent, templateContent, styleStartLine } = parserContent(content);
    html = templateContent;
    style = styleContent
    styleNO = styleStartLine
  }
  
  if (!style || !html) {
    return result;
  }
  return findInvalidCssByContents(style, html, styleNO, result);
}

/**
 * 根据style内容 html内容 来获取冗余css内容
 *
 * @param {*} style 样式表内容
 * @param {*} html html内容
 * @param {*} styleNO 行号
 * @return {*} 
 */
function findInvalidCssByContents(style, html, styleNO, result=[], needTemplateParser = false) {
  if (needTemplateParser) {
    // 如果是独立的调用，需要进行一次模板的处理
    html = new TemplateParser(
      html,
      ''
    ).getContent();
  }
  const htmlSelector = cheerio.load(
    html,
    {
      xmlMode: true,
      decodeEntities: false, // Decode HTML entities.
      withStartIndices: false, // Add a `startIndex` property to nodes.
      withEndIndices: false, // Add an `endIndex` property to nodes.
    },
    false
  );

  const parse = new Parser(style);

  let ast = parse.parse();

  parseSelectorElement(ast, '', htmlSelector, styleNO, result);

  return result;
}

exports.findInvalidCssByContents = findInvalidCssByContents;
exports.findInvalidCssByWpyContent = findInvalidCssByWpyContent;
export default findInvalidCssByWpyFile;

