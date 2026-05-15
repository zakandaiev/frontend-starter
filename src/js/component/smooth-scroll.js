import smoothScroll from '@/js/util/smooth-scroll';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (!anchor) {
      return false;
    }

    const anchorHref = anchor.getAttribute('href');
    if (!anchorHref.startsWith('#')) {
      return false;
    }

    event.preventDefault();

    if (anchorHref === '#') {
      return smoothScroll();
    }

    const target = document.querySelector(anchor.hash);
    if (!target) {
      return false;
    }

    event.preventDefault();
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    return smoothScroll(target, headerHeight + 32);
  });
});
