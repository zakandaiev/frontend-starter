document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach((anchor) => {
    if (!anchor.hasAttribute('href') || !anchor.href.startsWith('tel:')) {
      return false;
    }

    anchor.href = `tel:${anchor.href.replaceAll(/[^\d+]/g, '')}`;
  });
});
