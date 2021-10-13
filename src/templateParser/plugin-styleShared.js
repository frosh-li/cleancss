const {
  styleSharedComponents,
} = require(`${process.cwd()}/cleancss.config.js`);
import { readFileSync, existsSync } from "fs";
/**
 * 解决img-cdn类似的样式穿透问题
 * 根据路径替代对应文件内容
 * 放在pug编译后来处理
 * @param {*} op
 * @return {*}
 */
const styleSharedPlugin = function (opContent) {
  if (opContent) {
    let templateContent = opContent;
    for (let tag in styleSharedComponents) {
      const target = styleSharedComponents[tag];
      if (!existsSync(target)) {
        continue;
      }
      const wxml = readFileSync(target, "utf8");
      // 自闭和标签的处理
      const regAutoClose = new RegExp(`(<${tag}[^<]*\s*)/>`, "g");
      templateContent = templateContent.replace(regAutoClose, `$1>${wxml}${tag}`);
      const reg = new RegExp(`(<${tag}[^<]*>)[^<]*(</${tag}>)`, "g");
      templateContent = templateContent.replace(reg, `$1${wxml}$2`);
    }
    opContent = templateContent;
  }
  return opContent;
};

export default styleSharedPlugin;
