/**
 * 解决二元表达式的class处理逻辑
 *
 * @param {*} op
 * @return {*}
 */
const binaryExpressionPlugin = function (opContent) {
  if (opContent) {
    let templateContent = opContent;
    const matches = templateContent.match(/class="([^"]*)"/gim);
    if (!matches) {
      return;
    }
    // console.log(match)
    // 如果包含{{}} 进行一次替换
    matches.forEach((data) => {
      if (/\{\{.*\}\}/.test(data)) {
        const subTemp = data.match(/\{\{.*\}\}/g);
        subTemp.forEach((tpl) => {
          const subMatches = tpl.match(/\'([^']*)\'/g);
          if (!subMatches) {
            return;
          }
          templateContent = templateContent.replace(
            tpl,
            " " + subMatches.join(" ").replace(/\'/g, "")
          );
        });
      }

      if (/\{.*\}/.test(data)) {
        const subTemp = data.match(/\{.*\}/g);
        subTemp.forEach((tpl) => {
          const subMatches = tpl.match(/\'([^']*)\'/g);
          if (!subMatches) {
            return;
          }
          templateContent = templateContent.replace(
            tpl,
            " " + subMatches.join(" ").replace(/\'/g, "")
          );
        });
      }
    });

    opContent = templateContent;
  }
  return opContent;
};

export default binaryExpressionPlugin;
