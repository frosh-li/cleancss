import { pseudoElements } from "./config";

import { isRegExp, countLine, debug } from "./utils";
import colors from "colors/safe";

function isExcludes(oSelector) {
  const { excludes } = require(`${process.cwd()}/cleancss.config.js`);
  return excludes.some((ex) => {
    if (typeof ex === "string") {
      return oSelector.trim().indexOf(ex) > -1;
    }
    if (isRegExp(ex)) {
      return ex.test(oSelector.trim());
    }
  });
}

/**
 * 解析stylus的AST中的Selector元素
 * 判定是否为冗余代码
 *
 * @param {*} node
 * @param {string} [parentSelector=""]
 * @param {*} htmlSelector
 * @return {*}
 */
function parseSelectorElement(
  node,
  parentSelector = "",
  htmlSelector,
  styleStartLine = 0,
  res = []
) {
  if (!node) {
    return res;
  }
  const { nodes } = node;
  nodes.forEach((group) => {
    const selectors = group.nodes;
    if (!selectors) {
      return res;
    }
    if (!Array.isArray(selectors)) {
      return res;
    }
    selectors.forEach((selector) => {
      if (selector.constructor.name === "Selector") {
        const selectorString = selector.segments
          .map((i) => i.string)
          .join("")
          .trim();
        // console.log('selectorString', selector.segments)
        // fix Pseudo-elements are not supported by css-select
        let oSelector = `${parentSelector} ${selectorString}`;

        // 解决小程序特定的page样式
        if (selectorString.trim() === "page") {
          oSelector = `${parentSelector}`;
          if (selector.block.nodes) {
            parseSelectorElement(
              selector.block,
              oSelector,
              htmlSelector,
              styleStartLine,
              res
            );
          }
          return;
        }

        // &表示 .red.blue 中间不要空格 解决&符号的样式问题
        if (selectorString.indexOf("&") > -1) {
          oSelector = `${parentSelector}${selectorString.replace(/&/g, "")}`;
        }

        // 过滤各种伪类
        pseudoElements.forEach(
          (elem) => (oSelector = oSelector.replace(elem, ""))
        );

        if (
          htmlSelector(oSelector).html() === null &&
          htmlSelector(
            `[mask-class="${oSelector.trim().replace(".", "")}"]`
          ).html() === null &&
          htmlSelector(
            `[hover-class="${oSelector.trim().replace(".", "")}"]`
          ).html() === null
        ) {
          // 白名单
          if (!isExcludes(oSelector)) {
            const { lineno } = selector;
            debug.log(
              colors.yellow(`\tline:${lineno + styleStartLine - 1}`),
              colors.green("[冗余CSS]"),
              oSelector.trim()
            );
            
            const lineSets = new Set();

            lineSets.add(lineno + styleStartLine - 1);

            selector.block.nodes.forEach((node) => {
              lineSets.add(node.lineno + styleStartLine - 1);
            });

            countLine(lineSets.size);

            res.push(oSelector.trim());
            // 不进行子节点的判断了
            return;
          }
        }

        // 如果还有子节点
        if (selector.block.nodes) {
          parseSelectorElement(
            selector.block,
            oSelector,
            htmlSelector,
            styleStartLine,
            res
          );
        }
      }
    });
  });
  return res;
}

export default parseSelectorElement;
