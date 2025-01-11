document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('table').forEach((table) => {
    if (!table.parentElement.classList.contains('table-responsive') && !table.hasAttribute('data-noresponsive')) {
      const wrapper = document.createElement('div');

      wrapper.classList.add('table-responsive');

      table.before(wrapper);

      wrapper.appendChild(table);
    }
  });
});
