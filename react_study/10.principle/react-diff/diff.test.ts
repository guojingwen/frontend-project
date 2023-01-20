import { diffChildren } from "./diff";
import { describe, it, expect } from "vitest";

describe("diffChildren", () => {
  it("第一轮遍历结束，全部节点都可以复用", async () => {
    const result = diffChildren('abcd', 'abcd');
    console.log(result);
    expect(result).toEqual(['第一轮遍历结束，全部节点都可以复用'])
  });
  it("第一轮遍历结束，新children有剩余", () => {
    const result = diffChildren('abcd', 'abc');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束, 新children有剩余',
        '将剩余的新节点d插入尾部'
    ])
  })
  it("第一轮遍历结束，旧children有剩余", () => {
    const result = diffChildren('abc', 'abcd');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束, 旧children有剩余',
        '将剩余的新节点d删除'
    ])
  })
  it("元素移动：abcd --> acdb", () => {
    const result = diffChildren('acdb', 'abcd');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束新旧children都有剩余的情况',
        '将b移动到尾部'
    ])
  })
  it("元素移动：abcd --> dabc", () => {
    const result = diffChildren('dabc', 'abcd');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束新旧children都有剩余的情况',
        "将a移动到尾部",
        '将b移动到尾部',
        '将c移动到尾部',
    ])
  });
  it("有元素移动和新增元素：abcd --> dabce", () => {
    const result = diffChildren('dabce', 'abcd');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束新旧children都有剩余的情况',
        "将a移动到尾部",
        '将b移动到尾部',
        '将c移动到尾部',
        "将新元素e插入到尾部",
    ]);
  });
  it("有元素移动和新增元素：abcd --> daebc", () => {
    const result = diffChildren('daebc', 'abcd');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束新旧children都有剩余的情况',
        "将a移动到尾部",
        "将新元素e插入到尾部",
        '将b移动到尾部',
        '将c移动到尾部',
    ]);
  })
  it("有元素移动和新增元素：abcd --> dac", () => {
    const result = diffChildren('dac', 'abcd');
    console.log(result);
    expect(result).toEqual([
        '第一轮遍历结束新旧children都有剩余的情况',
        "将a移动到尾部",
        '将c移动到尾部',
        '删除b',
    ]);
  });
});
