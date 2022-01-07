export default function applyClass(options, classMaker) {
  if (Array.isArray(options)) {
    options.forEach((item) => {
      new classMaker(item.id, item.data);
    });
  } else {
    const items = document.querySelectorAll(options);
    items.forEach((item) => {
      new classMaker(item);
    });
  }
}