self.onmessage = function(e) {
  console.log(e.data);
  self.postMessage('干完了，下班了')
}
