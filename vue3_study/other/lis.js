/**
 * 最长上升子序列
 * 1. 暴力+剪枝
 * 2. 动态规划
 * 3. 贪心+二分法
 */

const nums = [9, 1, 0, 2, 4];
console.log(getLengthOfLIS3(nums));
// 1. 暴力+剪枝
function getLengthOfLIS(nums) {
  const result = [];
  run([], nums.slice());

  console.log(result);

  const maxLength = result.reduce(
    (maxLen, item) => Math.max(maxLen, item.length),
    0
  );

  return maxLength;

  function run(one, rest) {
    if (!rest.length) {
      return result.push(one.slice());
    }
    const first = rest.shift();
    const last = one.at(-1);
    run([...one], rest.slice());
    // 剪枝优化
    if (last === undefined || last < first) {
      run([...one, first], rest.slice());
    }
  }
}

// 2. 动态规划
function getLengthOfLIS2(nums) {
  if (!nums.length) {
    return 0;
  }
  const dp = [1];
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        max = Math.max(dp[i], max);
      }
    }
  }
  return max;
}

// 3. 贪心+二分法
function getLengthOfLIS3(nums) {
  if (!nums.length) {
    return 0;
  }
  const lis = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const last = lis.at(-1);
    const item = nums[i];
    if (item > last) {
      lis.push(item);
    } else {
      let st = 0,
        end = lis.length - 1;
      while (st < end) {
        let center = (st + end) >> 1;
        if (item < nums[center]) {
          end = center;
        } else {
          start = center + 1;
        }
      }
      lis[st] = item;
    }
  }
  return lis.length;
}
