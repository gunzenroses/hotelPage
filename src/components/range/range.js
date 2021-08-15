require("ion-rangeslider");

$("#range_1").ionRangeSlider({
  type: "double",
  min: 0,
  max: 15000,
  from: 5000,
  to: 10000,
  hide_min_max: true,
  hide_from_to: true,
  step: 100,
  onStart: changeValue,
  onChange: changeValue,
})

function changeValue(data){
  const rangeValue = $(data.input).siblings(".js-range-slider__value");
  rangeValue.val(`${data.from_pretty}₽ - ${data.to_pretty}₽`);
}