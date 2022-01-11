export default function initClass(options, ClassMaker) {
  console.log(options)
  const items = document.querySelectorAll(options);
  items.forEach((item) => {
    new ClassMaker(item);
  });
}
