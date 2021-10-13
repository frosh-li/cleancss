import stripIndent from "strip-indent";

const stripIndentPlugin = function (opContent) {
  if (opContent) {
    opContent = stripIndent(opContent);
  }
  return opContent;
};

export default stripIndentPlugin;
