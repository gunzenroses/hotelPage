const paginationData1 = {
  itemsPerPage: 12,
  totalNum: 15,
  visibleNum: 4,
  currentNum: 1,
};

const guestsData1 = [0, 0, 0];
const guestsDataBooking = [2, 1, 0];
const guestsDataSearch = [0, 0, 0];
const guestsDataSearchRoom = [2, 1, 1];

const roomsData1 = [2, 2, 0];
const roomsData2 = [2, 2, 0];

const room888 = {
  number: 888,
  type: 'Люкс',
  src: {
    1: 'src/assets/images/rooms/room.jpg',
    2: 'src/assets/images/rooms/room.jpg',
    3: 'src/assets/images/rooms/room.jpg',
    4: 'src/assets/images/rooms/room.jpg',
  },
  price: '9 900',
  rating: 5,
  review: 145,
};

const room840 = {
  number: 840,
  type: '',
  src: {
    1: 'src/assets/images/room2.jpg',
    2: 'src/assets/images/room2.jpg',
    3: 'src/assets/images/room2.jpg',
    4: 'src/assets/images/room2.jpg',
  },
  price: '9 900',
  rating: 4,
  review: 65,
};

export {
  paginationData1,
  guestsData1,
  guestsDataBooking,
  guestsDataSearch,
  guestsDataSearchRoom,
  roomsData1,
  roomsData2,
  room888,
  room840,
};
