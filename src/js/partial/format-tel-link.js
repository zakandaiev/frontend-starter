document.querySelectorAll('a').forEach(anchor => {
	if(anchor.hasAttribute('href') && anchor.href.startsWith('tel:')) {
		anchor.href = 'tel:' + anchor.href.replaceAll(/[^\d+]/g, '');
	}
});
