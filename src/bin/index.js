#!/usr/bin/env node
import findInvalidCssByWpyFile from "../main.js";
import glob from "glob";
import colors from "colors/safe";
import { existsSync, writeFileSync } from "fs";
import configContent from "../templates/cleancss.config.js";
import { countLine } from "../utils.js";

(() => {
  // 进行config文件初始化操作
  if (process.argv.includes("--init")) {
    console.log(colors.green("init project"));
    writeFileSync("cleancss.config.js", configContent);
    return;
  }

  if (!existsSync("cleancss.config.js")) {
    console.log(colors.red("没有找到cleancss.config.js，请先运行init"));
    return;
  }

  // 仅仅进行输出 不中断
  if (process.argv.includes("--check")) {
    return;
  }

  const target = process.argv[2];
  let partten = target || "src/**/*.wpy";
  const results = {};

  glob(partten, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!files) {
      console.log(colors.red("检查是否在小程序目录内"));
      return;
    }
    files.forEach((file) => {
      console.log(colors.green("[开始检查]"), file);
      results[file] = findInvalidCssByWpyFile(file);
    });

    console.log("总冗余行数", countLine());

    for (let key in results) {
      if (results[key] && results[key].length > 0) {
        throw new Error("无法通过冗余检查");
      }
    }
    console.log(colors.green("无冗余CSS:通过检查"));
  });
})();
