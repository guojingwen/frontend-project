/**
 * vue3中是获取最大上升子序列的下标数组
 * 比算法题获取最大上升子序列长度还要高一个难度
 * 但本质上还是 贪心 + 二分查找的算法 算法复杂度 NlogN
 * 最大上升子序列 参考这个视频 https://www.youtube.com/watch?v=DhVLOS44yoY&t=509s
 */

/**
 * 假设你已经熟悉了前面的算法题
 * 我们先考虑一个简单场景
 * 求  [1    3    2    4    6    5]  的最大上升子序列
 *     1
 *     1    3
 *     1    2
 *     1    2    4
 *     1    2    4    6
 *     1    2    4    5
 */

const arr = [1, 3, 2, 4, 6, 5];
// 最大上升子序列为 [1,2,4,5]
// 对应的下标为    [0,2,3,5]
// console.log(getSequence(arr)); // [0, ]
function getSequence(arr) {
  let i, j, start, end, center;
  const len = arr.length;

  // result存放的是最大上升子序列的下标
  const result = [0];
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    const lastIndex = result.at(-1);
    if (arrI > arr[lastIndex]) {
      result.push(i);
      continue;
    }

    start = 0;
    end = result.length;
    while (start < end) {
      //  >> 右移运算符
      // 等于 Math.floor((u+v)/2);
      // 使用二进制运算可以大幅提高计算效率
      center = (start + end) >> 1;
      if (arrI > arr[result[center]]) {
        start = center + 1;
      } else {
        end = center;
      }
    }
    result[start] = i;
  }
  return result;
}

// console.log(getSequence([1, 3, 2, 4, 6, 0]));
/**
 * 假设我们再换一个例子
 * 求  [1    3    2    4    6    0]  的最大上升子序列
 * 很明显是  [0, 2, 3, 4]
 * 但是运算结果为 [5,2,3,4]
 * 思路没有错，我们需要一个新的数组用来记录它前面的数字
 * 对于本例子该数组为 preIndexs = [0, 1, 1, 2, 3, 0];
 * 我们后往前遍历 修复后的数组为 [0, 2, 3, 4];
 */

console.log(getSequence2([1, 3, 2, 4, 6, 0]));
function getSequence2(arr) {
  if (!arr.length) return [];
  if (arr.length < 2) return [0];

  const preIndexs = arr.slice();
  let i, j, start, end, center;
  const len = arr.length;

  // result存放的是最大上升子序列的下表
  const result = [0];
  for (i = 1; i < len; i++) {
    j = result.at(-1);
    const arrI = arr[i];
    if (arrI === 0) continue;
    const lastIndex = result.at(-1);
    if (arrI > arr[lastIndex]) {
      preIndexs[i] = j;
      result.push(i);
      continue;
    }

    start = 0;
    end = result.length;
    while (start < end) {
      //  >> 右移运算符
      // 等于 Math.floor((u+v)/2);
      // 使用二进制运算可以大幅提高计算效率
      center = (start + end) >> 1;
      if (arrI > arr[result[center]]) {
        start = center + 1;
      } else {
        end = center;
      }
    }
    if (arrI < arr[result[start]]) {
      if (start > 0) {
        preIndexs[i] = result[start - 1];
      }
    }
    result[start] = i;
  }
  // console.log(preIndexs);

  end = result.length;
  let temp = result[end - 1];
  while (end--) {
    result[end] = temp;
    temp = preIndexs[temp];
  }
  return result;
}
