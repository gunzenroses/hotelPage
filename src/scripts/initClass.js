export default function initClass(options, ClassMaker) {
  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll(options);
      items.forEach((item) => {
        new ClassMaker(item);
      });
  })
}
