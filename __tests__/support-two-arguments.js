import { findInvalidCssByContents } from '..'

const html = 
`
<view class="page">
  <view>xxx</view>
</view>
`

const style = 
`
.page {
  background: red;
}

.invalid-selector {
  background: red;
}
`

test('Support two arguments.', () => {
  expect(findInvalidCssByContents(style, html, 0, [], true)).toStrictEqual(['.invalid-selector'])
})
