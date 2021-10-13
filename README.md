# 小程序冗余 css 清理工具

sht-cleancss <file> [--debug]

## 开发指南

- `npm run watch`
- `npm run test` 查看结果

## 本地开发

- `npm run watch` 开启编译模式
- `npm link` 进行 link
- `cd miniprogram` 进入到小程序开发目录
- `npm link sht-cleancss` 通过 link 方式安装 sht-cleancss

  ```
  npm run sht-cleancss #执行默认命令
  npx sht-cleancss "src/pagesPartner/mine/saleEstablish.wpy" 检测单文件
  ```


# 执行检测所有文件
npm run cleancss
# 或者
npx run cleancss "src/**/*.wpy"

# 执行单文件检测
npx sht-cleancss "src/pagesPartner/mine/saleEstablish.wpy"

# 打印日志
npx sht-cleancss "src/pagesPartner/mine/saleEstablish.wpy" --debug
```

## 注意

src/pages/group/seckillInfo.wpy 文件中有两处`<style lang="stylus">`需要手动删除
