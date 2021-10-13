import pug from "pug";

const pugPlugin = function (opContent) {
  if (opContent) {
    try {
      const fn = pug.compile(opContent, { pretty: true });
      opContent = fn();
    } catch (e) {
      console.log(e.message);
    }
  }

  opContent = opContent
    .replace(/&quot;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'");

  return opContent;
};

export default pugPlugin;
