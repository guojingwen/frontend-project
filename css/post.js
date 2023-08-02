(function() {
	document.addEventListener('DOMContentLoaded', function(e) {
		console.log('---DOMContentLoaded', Date.now());
		contentAddUrlHash();
		tocAddUrlHash();
	}, false);
	window.onload = function() {
		console.log('---onload', Date.now());
	}
	function contentAddUrlHash() {
		var contentEle = document.getElementById('post-card');
		var titleQuerys = Array.from({length: 6}, (v, h) => `h${h+1}[data-id]`).join(',')
		var sections = contentEle.querySelectorAll(titleQuerys);
		[...sections].forEach(ele => {
			const content = ele.innerText;
			ele.setAttribute('id', content);
			ele.innerHTML = `<a class="header-anchor" href="#${content}" aria-hidden="true">#</a> ${content}`
		});
	}
	function tocAddUrlHash() {
		const container = document.getElementById('toc-container');
		container.addEventListener('click', function(e) {
			const target = e.target;
			if (!/^DIV/.test(target.tagName.toLocaleUpperCase())) return;
			if (!target.classList.contains('title-anchor')) return;
			const content = target.innerText;
			location.hash = content;
			e.stopPropagation();
			// e.stopImmediatePropagation();
		}, true);
	}
})();


