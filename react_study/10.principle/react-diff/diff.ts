/**
 * react diff
 * 1. abcd -> acdb
 * 2. abcd -> dabc
 */
export function diffChildren(newStr: string, oldStr: string): string[] {
  // 第一轮循环 找出头部无变更的元素
  let lastPlaceIndex = 0;
  const result: string[] = [];
  for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] && oldStr[i] && newStr[i] === oldStr[i]) {
      lastPlaceIndex = i+1;
    } else {
      break;
    }
  }
  if (
    lastPlaceIndex === newStr.length &&
    lastPlaceIndex === oldStr.length
  ) {
    result.push("第一轮遍历结束，全部节点都可以复用");
    return result;
  }
  if (lastPlaceIndex === oldStr.length) {
    result.push("第一轮遍历结束, 新children有剩余");
    result.push(`将剩余的新节点${newStr.slice(lastPlaceIndex)}插入尾部`);
    return result;
  }
  if (lastPlaceIndex === newStr.length) {
    result.push("第一轮遍历结束, 旧children有剩余");
    result.push(`将剩余的新节点${oldStr.slice(lastPlaceIndex)}删除`);
    return result;
  }
  result.push(`第一轮遍历结束新旧children都有剩余的情况`);
  // 第二轮循环
  const restOfOld = [...oldStr.slice(lastPlaceIndex)];
  const [map, deletionsMap] = restOfOld.reduce(([map1, map2], item, index) => {
    map1[item] = index + lastPlaceIndex;
    const map2Index = index + lastPlaceIndex + '';
    map2[map2Index] = true;
    return [map1, map2];
  }, [{}, {}] as [{[key: string]: number}, {[key: string]: boolean}]);
  const restOfNew = [...newStr.slice(lastPlaceIndex)];
  for (let j = 0; j < restOfNew.length; j++) {
    const oldIndex = map[restOfNew[j]];
    if(oldIndex !== undefined) {
        deletionsMap[oldIndex] = false;
    }
    if(oldIndex === undefined) {
      result.push(`将新元素${restOfNew[j]}插入到尾部`);
      lastPlaceIndex = Math.max(oldStr.length, lastPlaceIndex) + 1;
    } else if (oldIndex > lastPlaceIndex) {
      lastPlaceIndex = oldIndex;
    } else if (oldIndex < lastPlaceIndex) {
      result.push(`将${restOfNew[j]}移动到尾部`);
    }
  }
  Object.keys(deletionsMap)
    .filter(index => deletionsMap[index])
    .forEach(index => {
        console.log(`删除${oldStr[index]}`)
        result.push(`删除${oldStr[index]}`);
    })
  return result;
}
