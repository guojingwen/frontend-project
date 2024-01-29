function getLengthOfLIS(nums) {
  const dp = [1]
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] > nums[i-1]) {
      dp[i] = dp[i-1] + 1
    } else {
      dp[i] = dp[i-1];
    }
  }
  return dp[nums.length-1]
}
