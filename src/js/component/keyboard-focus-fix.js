document.addEventListener('DOMContentLoaded', () => {
  const isIOS = /iphone|ipad/.test(navigator.userAgent.toLowerCase());
  if (!isIOS) {
    return false;
  }

  const paddingMap = new WeakMap();
  const stickyElements = new Set();

  function disableStickyElements(parentNode) {
    if (!parentNode) {
      return false;
    }

    parentNode.querySelectorAll('*').forEach((el) => {
      const style = getComputedStyle(el);
      if (style.position !== 'sticky') {
        return false;
      }

      el.originalPosition = el.style.position;
      el.style.position = 'static';

      stickyElements.add(el);
    });
  }

  function restoreStickyElements() {
    stickyElements.forEach((el) => {
      el.style.position = el.originalPosition || '';
      delete el.originalPosition;
    });

    stickyElements.clear();
  }

  document.body.addEventListener(
    'focus',
    (event) => {
      const { target } = event;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return false;
      }

      const scrollContainer = findScrollableParent(target);
      const originalPadding = parseFloat(getComputedStyle(scrollContainer).paddingBottom) || 0;

      disableStickyElements(scrollContainer);

      // Wait for keyboard loaded
      setTimeout(() => {
        const rect = target.getBoundingClientRect();
        const viewportHeight = window.visualViewport?.height || window.innerHeight;

        // If input is visible do nothing
        if (rect.top >= 0 && rect.bottom <= viewportHeight) {
          return false;
        }

        if (!paddingMap.has(scrollContainer)) {
          paddingMap.set(scrollContainer, originalPadding);
          scrollContainer.style.paddingBottom = `${originalPadding + window.innerHeight * 0.5}px`;
        }

        target.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }, 1000);
    },
    true,
  );

  document.body.addEventListener(
    'blur',
    (event) => {
      const { target } = event;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return false;
      }

      const scrollContainer = findScrollableParent(target);
      const originalPadding = paddingMap.get(scrollContainer);

      restoreStickyElements();

      if (originalPadding !== undefined) {
        let isCleaned = false;

        const cleanup = () => {
          if (isCleaned) {
            return false;
          }

          scrollContainer.style.paddingBottom = `${originalPadding}px`;
          paddingMap.delete(scrollContainer);

          document.removeEventListener('click', onClick, true);
          document.removeEventListener('touchend', onClick, true);

          isCleaned = true;
        };

        const onClick = () => {
          requestAnimationFrame(cleanup);
        };

        document.addEventListener('click', onClick, true);
        document.addEventListener('touchend', onClick, true);

        setTimeout(cleanup, 1000);
      }
    },
    true,
  );
});

function findScrollableParent(el) {
  let current = el.parentElement;

  while (current) {
    const { overflowY } = getComputedStyle(current);

    const isScrollable = overflowY === 'auto' || overflowY === 'scroll' ? true : false;
    if (isScrollable) {
      return current;
    }

    current = current.parentElement;
  }

  return document.body;
}
