
const isDebugger = process.argv.includes("--debug");

exports.isDebugger = isDebugger;

/**
 * 检查传入值是否为正则表达式
 * @param {object} value
 * @returns
 */
exports.isRegExp = (value) => {
  return Object.prototype.toString.call(value) === "[object RegExp]";
};

/**
 * 根据标签名称和lang类型 获取正则表达式
 * 目前只是支持获取template为pug 或者 style为stylus的标签内容
 * @param {*} tag template | style
 * @param {*} lang pug | stylus
 * @returns
 */
exports.generateRegexp = (tag, lang) => {
  return new RegExp(
    `<${tag}\\s*(?:lang="(${lang})")?[^>]*>([\\r\\s\\S]*)<\/${tag}>`
  );
};

exports.debug = {
  log: function(...args) {
    if (isDebugger) {
      console.log(...args)
    }
  }
}

function CountLine() {
  let total = 0;
  return function add(num = 0) {
    total += num;
    return total;
  };
}
exports.countLine = new CountLine();
