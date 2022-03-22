import DropdownItem from '../dropdown-item/DropdownItem';

export default class DropdownRooms extends DropdownItem {
  constructor(item) {
    super(item)
  }

  _updateInfoInput() {
    this.infoInput.value = '';
    const roomInfo = [];
    this.data.forEach((num, i) => {
      if (num > 0) {
        roomInfo.push(this._adjustDataType(i));
      }
    });
    const roomText = roomInfo.join(', ');
    this.infoInput.value = roomText.length > 20
      ? `${ roomText.slice(0, 20) }...`
      : roomText;
  }

  _adjustDataType(j) {
    const dataType = this.dropdownItems[j].dataset.type;
    let dataTypeName;
    if (this.data[j] === 1) {
      switch (dataType) {
        case 'bedrooms':
          dataTypeName = 'спальня';
          break;
        case 'beds':
          dataTypeName = 'кровать';
          break;
        default:
          dataTypeName = 'ванная комната';
          break;
      }
    } else if (this.data[j] > 1 && this.data[j] < 5) {
      switch (dataType) {
        case 'bedrooms':
          dataTypeName = 'спальни';
          break;
        case 'beds':
          dataTypeName = 'кровати';
          break;
        default:
          dataTypeName = 'ванных комнаты';
          break;
      }
    } else {
      switch (dataType) {
        case 'bedrooms':
          dataTypeName = 'спален';
          break;
        case 'beds':
          dataTypeName = 'кроватей';
          break;
        default:
          dataTypeName = 'ванных комнат';
          break;
      }
    }
    return `${ this.data[j] } ${ dataTypeName }`;
  }
}