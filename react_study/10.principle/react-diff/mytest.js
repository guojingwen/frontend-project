import { diffChildren } from "./diff.js";

// it("元素移动：abcd --> acdb", () => {
  const result = diffChildren('acdb', 'abcd');
  console.log(result);
  // expect(result).toEqual([
  //     '第一轮遍历结束新旧children都有剩余的情况',
  //     '将b移动到尾部'
  // ])
// })
/* it("元素移动：abcd --> dabc", () => {
  const result = diffChildren('dabc', 'abcd');
  console.log(result);
  expect(result).toEqual([
      '第一轮遍历结束新旧children都有剩余的情况',
      "将a移动到尾部",
      '将b移动到尾部',
      '将c移动到尾部',
  ])
}); */