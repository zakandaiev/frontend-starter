function makeAlert(type, text, seconds = 5) {
	if(!text || !text.length) {
		return false;
	}

	let container = document.querySelector('.toasts');
	if(!container) {
		container = document.createElement('div');
		container.classList.add('toasts');
		document.body.appendChild(container);
	}

	let toast = document.createElement('div');
	toast.classList.add('toasts__item');
	if(type) {
		toast.classList.add(type);
	}

	let toast_icon = document.createElement('i');
	toast_icon.classList.add('toasts__icon');
	if(type) {
		toast_icon.classList.add(type);
	}

	let toast_text = document.createElement('span');
	toast_text.classList.add('toasts__text');
	toast_text.textContent = text;

	toast.appendChild(toast_icon);
	toast.appendChild(toast_text);

	container.appendChild(toast);

	toast.addEventListener('click', () => closeAlert(container, toast));

	setTimeout(() => closeAlert(container, toast), seconds * 1000);

	return true;
}

function closeAlert(container, toast) {
	toast.classList.add('disappear');
	setTimeout(() => {
		toast.remove();
		if(container && container.childElementCount <= 0) {
			container.remove();
		}
	}, 500);
}