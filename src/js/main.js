const BASE_URL = window.location.protocol + '//' + window.location.host;

@@include('partial/watermark.js')

// UTILS
@@include('util/fade-out.js')
@@include('util/smooth-scroll.js')
@@include('util/replace-broken-image.js')

document.addEventListener('DOMContentLoaded', () => {
	// PARTIALS
	@@include('partial/format-tel-link.js')
	@@include('partial/external-link-norefer.js')
	@@include('partial/protect-image.js')
	@@include('partial/responsive-table.js')
});
