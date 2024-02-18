function smoothScroll(element = null, offsetTop = 0, behavior = 'smooth') {
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offsetTop;

    window.scrollTo({ top: offsetPosition, behavior });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}

export default smoothScroll;
