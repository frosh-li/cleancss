import { findInvalidCssByWpyContent } from "..";

const fileContent = `
<template>
<view class="page">
  <view>xxx</view>
</view>
</template>

<style>
.page {
  background: red;
}

.invalid-selector {
  background: red;
}
</style>
`;

test("No preprocessors to support test case.", () => {
  expect(findInvalidCssByWpyContent(fileContent)).toStrictEqual([".invalid-selector"]);
});
