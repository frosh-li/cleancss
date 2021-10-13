/**
 * 替换class变量的形式
 * :class=替换为class=
 *
 * @param {*} op
 * @return {*}
 */
const classTagPlugin = function (opContent) {
  if (opContent) {
    let templateContent = opContent;
    const isClassElement = templateContent.match(
      /<\w+[^<]*:class\s*=\s*"([^"]*)"[^<]*>/gm
    );

    if (!isClassElement) {
      return opContent;
    }

    isClassElement.forEach((item) => {
      // templateContent = templateContent.replace(item, "");
      const varClass = item.match(/:class\s*=\s*"([^\"]*)"/);
      const [rClass, nClasses] = varClass;
      const nClassAttr = item.match(/\sclass\s*=\s*"([^\"]*)"/);

      let rLine = item;
      rLine = item.replace(rClass, "");
      if (nClassAttr) {
        rLine = rLine.replace(
          nClassAttr[0],
          ` class="${nClassAttr[1] + " " + nClasses}"`
        );
      } else {
        // 如果没有class属性
        rLine = rLine.replace(">", ` class="${nClasses}">`);
      }

      templateContent = templateContent.replace(item, rLine);
    });
    opContent = templateContent;
  }
  return opContent;
};

export default classTagPlugin;
