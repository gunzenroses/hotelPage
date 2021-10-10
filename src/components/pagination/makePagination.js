import ButtonPagination from './pagination';

export default function makePagination(items) {
  items.forEach((item) => {
    new ButtonPagination(item.id, item.data);
  });
}
