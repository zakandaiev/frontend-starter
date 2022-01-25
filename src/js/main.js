// TOASTS
@@include("partials/toasts.js")

// INTERACTIVE ELEMENTS
const loader = '<div class="loader"><span></span><span></span><span></span><span></span></div>';
const image_placeholder = '/img/no_image.jpg';

// FUNCTIONS
function SmoothScrollTo(element) {
	if(element) {
		element.scrollIntoView({
				behavior: "smooth"
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// DOM NODES
	const anchors = document.querySelectorAll("a");
	const tables = document.querySelectorAll("table");
	const forms = document.querySelectorAll("form");
	const images = document.querySelectorAll("img");

	// SMOOTH SCROLL
	anchors.forEach(anchor => {
		if(anchor.hasAttribute("target") && anchor.getAttribute("target") === "_blank") {
			anchor.setAttribute("rel", "noopener noreferrer");
		}
		anchor.addEventListener("click", event => {
			const anchor_href = event.currentTarget.getAttribute("href");
			if(anchor_href.charAt(0) === "#" || (anchor_href.charAt(0) === "/" && anchor_href.charAt(1) === "#")) {
				const scroll_to_node = document.querySelector(event.currentTarget.hash);
				if(scroll_to_node) {
					event.preventDefault();
					SmoothScrollTo(scroll_to_node);
				}
			}
		});
	});

	// RESPONSIVE TABLES
	tables.forEach(table => {
		if(!table.parentElement.classList.contains("table-responsive")) {
			table.outerHTML = '<div class="table-responsive">'+table.outerHTML+'</div>';
		}
	});

	// FORMS
	@@include("partials/forms.js")
});

window.onload = () => {
	// HANDLE BROKEN IMAGES
	const images = document.querySelectorAll("img");
	images.forEach(image => {
		if(image.complete && typeof image.naturalWidth != "undefined" && image.naturalWidth <= 0) {
			image.src = image_placeholder;
		}
	});

	// PROTECT IMAGES FROM DOWNLOAD (yup, sesuriti lvl 140% xd)
	document.addEventListener("contextmenu", event => {
		if(event.target.nodeName == "IMG") {
			event.preventDefault();
		}
	});
};