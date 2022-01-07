export default function applyClass(options, ClassMaker) {
  if (Array.isArray(options)) {
    options.forEach((item) => {
      new ClassMaker(item.id, item.data);
    });
  } else {
    const items = document.querySelectorAll(options);
    items.forEach((item) => {
      new ClassMaker(item);
    });
  }
}
