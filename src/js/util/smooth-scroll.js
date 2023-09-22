function smoothScroll(element = null, behavior = 'smooth') {
	if (element) {
		element.scrollIntoView({ behavior });
	}
	else {
		window.scrollTo({ top: 0, behavior });
	}
}

document.addEventListener('click', event => {
	if (event.target.tagName !== 'A') {
		return false;
	}
	const anchor = event.target;
	const anchor_href = anchor.getAttribute('href');

	if (anchor_href === '#') {
		event.preventDefault();

		smoothScroll();
	}
	else if (anchor_href.charAt(0) === '#' || (anchor_href.charAt(0) === '/' && anchor_href.charAt(1) === '#')) {
		if (!anchor.hash) {
			return false;
		}

		const target = document.querySelector(anchor.hash);
		if (target) {
			event.preventDefault();

			smoothScroll(target);
		}
	}
});
