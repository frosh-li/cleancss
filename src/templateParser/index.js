import fs from "fs";

class TemplateParser {
  constructor(content = "", lang) {
    this.op = {
      content,
    };
    this.plugins = [
      "tabToSpace", // tab转空格
      "stripIndent",
      "eventTag",
      lang, // lang为pug才去调用pug
      "styleShared",
      "binaryExpression",
      "classTag",
      "deleteBlockTag",
    ];
    this.loadedPlugins = [];
    this.loadPlugin();
    this.parser();
  }

  /**
   * 加载解析插件
   *
   * @memberof TemplateParser
   */
  loadPlugin() {
    for (let key of this.plugins) {
      if (!key) {
        continue;
      }
      const modulePath = `./plugin-${key}.js`;
      const plg = require(modulePath).default;
      this.loadedPlugins.push(plg);
    }
  }

  /**
   * 解析插件模板内容
   *
   * @memberof TemplateParser
   */
  parser() {
    // console.log('before op', this.op)
    for (let plugin of this.loadedPlugins) {
      this.op.content = plugin(this.op.content);
    }
    // console.log('after op', this.op)
    require("fs").writeFileSync("/tmp/templateContent", this.op.content || "");
  }

  getContent() {
    return this.op.content;
  }
}

export default TemplateParser;
