/**
 * 替换@tap="" 这种pug无法识别解析的标签
 *
 * @param {*} op
 * @return {*}
 */
const eventTagPlugin = function (opContent) {
  if (opContent) {
    let templateContent = opContent;

    opContent = templateContent.replace(
      /@[a-zA-Z\-\_]+\s*=\s*\"([^"]*)\"[\s\r\n\t]*/g,
      ""
    );
  }
  return opContent;
};

export default eventTagPlugin;
