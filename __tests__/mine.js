
import findInvalidCssByWpyFile from "..";

test("test groupList.wpy", () => {
  
  const res = findInvalidCssByWpyFile("./fixtures/mine.wpy")
  expect(res).toStrictEqual([
    ".line",
    ".bottom",
    ".qrcode_wrapper",
    ".Z .mt10",
    ".Z view.pt25",
    ".Z .section .msg",
    ".Z .more text",
    ".modal__qr .modal__main",
    ".modal__copy .modal__main",
    ".Z .contentBg .line",
    ".app-download .block .right image",
    ".activeNav .activeCoupon2",
    ".activeNav .activeGroup2",
    ".activeNav .activeLife2 .couponItem .itemNum text",
    ".activeNav .activeLife2 .groupItem",
    ".activeNav .activeLife2 .lifeItem",
    ".shareWx"
  ])
});
