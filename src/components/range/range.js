import 'ion-rangeslider';

function changeValue(data) {
  const toPretty = data.to_pretty ? data.to_pretty : '10 000';
  const fromPretty = data.from_pretty ? data.from_pretty : '5 000';
  const rangeValue = $(data.input).siblings('.js-range-slider__value');
  rangeValue.val(`${fromPretty}₽ - ${toPretty}₽`);
}

$('.range__slider').ionRangeSlider({
  type: 'double',
  min: 0,
  max: 15000,
  from: 5000,
  to: 10000,
  hide_min_max: true,
  hide_from_to: true,
  prettify_enabled: true,
  step: 100,
  onStart: changeValue,
  onChange: changeValue,
});
