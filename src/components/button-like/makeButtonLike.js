import ButtonLike from './ButtonLike';

export default function makeButtonLike(items) {
  items.forEach((item) => {
    new ButtonLike(item.id, item.data);
  });
}
