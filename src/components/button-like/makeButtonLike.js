import ButtonLike from './ButtonLike';

export default function makeButtonLike(elements) {
  elements.forEach((element) => {
    new ButtonLike(element.id, element.data);
  });
}
