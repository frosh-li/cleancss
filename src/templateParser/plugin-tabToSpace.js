

const tabToSpacePlugin = function (opContent) {
  if (opContent) {
    const { common } = require(`${process.cwd()}/cleancss.config.js`);
    const { tab } = common;
    opContent = opContent.replace(/\t/g, "".padStart(tab, " "));
  }
  return opContent;
};

export default tabToSpacePlugin;
