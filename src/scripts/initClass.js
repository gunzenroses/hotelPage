export default function initClass(options, ClassMaker) {
  const items = document.querySelectorAll(options);
  items.forEach((item) => {
    new ClassMaker(item);
  });
}
