import { findInvalidCssByWpyContent } from "..";

const fileContent = `
<template lang="pug">
view.page
  view xxx
</template>

<style lang="stylus">
.page {
  background: red;
}

.invalid-selector {
  background: red;
}
</style>
`;

test("Example test  case.", () => {
  expect(findInvalidCssByWpyContent(fileContent)).toStrictEqual([".invalid-selector"]);
});
