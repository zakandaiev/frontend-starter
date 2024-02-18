function sleep(ms) {
  // eslint-disable-next-line
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep;
