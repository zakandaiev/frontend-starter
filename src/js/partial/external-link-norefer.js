document.querySelectorAll('a').forEach(anchor => {
	if(anchor.hasAttribute('target') && anchor.getAttribute('target') === '_blank') {
		anchor.setAttribute('rel', 'noopener noreferrer nofollow');
	}
});
