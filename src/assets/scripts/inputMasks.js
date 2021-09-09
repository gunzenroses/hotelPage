import Inputmask from 'inputmask';

Inputmask({
  mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
  greedy: false,
  onBeforePaste(pastedValue) {
    const lowerPastedValue = pastedValue.toLowerCase();
    return lowerPastedValue.replace('mailto:', '');
  },
  definitions: {
    '*': {
      validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
      cardinality: 1,
      casing: 'lower',
    },
  },
})
  .mask($("input[name='email']"));

Inputmask(
  'datetime', {
    placeholder: 'ДД.ММ.ГГГГ',
    separator: '.',
    alias: 'dd.mm.yyyy',
    inputFormat: 'dd.mm.yyyy',
    min: '01/01/1900',
    max: '01/01/2018',
  },
)
  .mask($("input[name='birthday']"));
