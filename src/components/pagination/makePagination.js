import ButtonPagination from './Pagination';

export default function makePagination(items) {
  items.forEach((item) => {
    new ButtonPagination(item.id, item.data);
  });
}
