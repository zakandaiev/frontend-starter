const BASE_URL = window.location.protocol + '//' + window.location.host;
const PATH_URL = window.location.pathname;
const FULL_URL = window.location.href;
const GET_PARAM = (key) => {
	return new URL(FULL_URL).searchParams.get(key);
};

@@include('partial/watermark.js')

// UTILS
@@include('util/cyr-to-lat.js')
@@include('util/encoding.js')
@@include('util/fade.js')
@@include('util/geolocation.js')
@@include('util/is-object.js')
@@include('util/random-int.js')
@@include('util/request.js')
@@include('util/sleep.js')
@@include('util/smooth-scroll.js')
@@include('util/storage.js')
@@include('util/vibrate.js')

document.addEventListener('DOMContentLoaded', () => {
	// PARTIALS
	@@include('partial/data-copy.js')
	@@include('partial/format-tel-link.js')
	@@include('partial/external-link-norefer.js')
	@@include('partial/protect-image.js')
	@@include('partial/responsive-table.js')
});

@@include('partial/placeholder-image.js')
