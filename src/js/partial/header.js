document.addEventListener('DOMContentLoaded', () => {
  setHeader();

  window.addEventListener('scroll', () => setHeader());
});

function setHeader() {
  const header = document.getElementById('header');

  if (!header) {
    return false;
  }

  const scrolledPxs = document.documentElement.scrollTop;

  if (scrolledPxs > 0) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}
