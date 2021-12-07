function makeAlert(type, text, time = 5000) {
	let container = document.querySelector(".toasts");
	if(!container) {
		container = document.createElement("div");
		container.classList.add("toasts");
		document.body.appendChild(container);
	}

	let toast = document.createElement("div");
	toast.classList.add("toasts__item");
	if(type) {
		toast.classList.add(type);
	}
	toast.textContent = text;

	container.appendChild(toast);

	toast.addEventListener("click", () => closeAlert(container, toast));

	setTimeout(() => closeAlert(container, toast), time);
}

function closeAlert(container, toast) {
	toast.classList.add("disappear");
	setTimeout(() => {
		toast.remove();
		if(container && container.childElementCount <= 0) {
			container.remove();
		}
	}, 500);
}