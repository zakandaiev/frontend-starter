import smoothScroll from '@/js/util/smooth-scroll';

document.addEventListener('DOMContentLoaded', () => {
  const headerHeight = document.getElementById('header')?.offsetHeight || 0;

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');

    if (!anchor) {
      return false;
    }

    const anchorHref = anchor.getAttribute('href');

    if (anchorHref === '#') {
      event.preventDefault();

      smoothScroll();
    } else if (anchorHref.charAt(0) === '#' || (anchorHref.charAt(0) === '/' && anchorHref.charAt(1) === '#')) {
      if (!anchor.hash) {
        return false;
      }

      const target = document.querySelector(anchor.hash);
      if (target) {
        event.preventDefault();

        smoothScroll(target, headerHeight + 32);
      }
    }
  });
});
