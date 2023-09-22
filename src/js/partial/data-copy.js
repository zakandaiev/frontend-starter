if (navigator && navigator.clipboard) {
	document.addEventListener('click', event => {
		const element = event.target.closest('[data-copy]');

		if (!element) {
			return false;
		}

		event.preventDefault();

		const text = element.getAttribute('data-copy').length > 0 ? element.getAttribute('data-copy') : element.textContent;

		if (!text) {
			return false;
		}

		navigator.clipboard.writeText(text).then(() => {
			if (element.hasAttribute('data-toast') && toast instanceof Function) {
				toast(element.getAttribute('data-toast-type') || 'info', element.getAttribute('data-toast'));
			}
		});
	});
}
