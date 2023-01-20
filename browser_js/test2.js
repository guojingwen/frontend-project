var a = maxUp([2, 5, 1, 3, 4, 8]);
console.log(a);

function maxUp(arr) {
   const dp = [];
   dp[0] = 1;
   let max = dp[0];
   for(let i = 1; i<arr.length; i++) {
      dp[i] = 1;
      for(let j = 0; j<i; j++) {
        if(arr[j] < arr[i]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
      max = Math.max(dp[i], max);
   }
   console.log(dp);
   return max;
}
 