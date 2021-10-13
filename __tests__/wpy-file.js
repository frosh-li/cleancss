
import findInvalidCssByWpyFile from "..";

test("test groupList.wpy", () => {
  
  const res = findInvalidCssByWpyFile("./fixtures/groupList.wpy")
  expect(res).toStrictEqual([
    '.modal__copy .modal__main',
    'button.share',
    '.close',
    '.empty',
    '.restNo',
    '.top_page',
    '.heightAll',
    '.subject',
    '.subjectLoad',
    '.bannerLoad .activiContent',
    '.merch_none_wrapper',
    '.phone_modal .header',
    '.hotToday',
    '.hotTodayHeight',
    '.partner-invite-new',
    '.invite-user',
    '.bg-white',
    '.bg-new-style'
  ])
});
