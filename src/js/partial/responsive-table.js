document.querySelectorAll('table').forEach(table => {
	if(!table.parentElement.classList.contains('table-responsive')) {
		table.outerHTML = '<div class="table-responsive">' + table.outerHTML + '</div>';
	}
});
