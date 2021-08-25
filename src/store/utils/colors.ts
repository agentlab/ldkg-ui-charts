export const colors10 = [
  '#2E8DF9',
  '#1FD0BE',
  '#EB648C',
  '#F8C653',
  '#EC7E31',
  '#A9378F',
  '#049586',
  '#1553B6',
  '#54008C',
  '#8A572A',
];

export const colors20 = [
  '#1F77B4',
  '#AEC7E8',
  '#FF7F0E',
  '#FFBB78',
  '#2CA02C',
  '#98DF8A',
  '#D62728',
  '#FF9896',
  '#9467BD',
  '#C5B0D5',
  '#8C564B',
  '#C49C94',
  '#E377C2',
  '#F7B6D2',
  '#7F7F7F',
  '#C7C7C7',
  '#BCBD22',
  '#DBDB8D',
  '#17BECF',
  '#9EDAE5',
];

export const qualitative20 = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#6F5EF9',
  '#D3CEFD',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

function* colorGenerator(colors: string[]) {
  let i = 0;
  while (true) {
    yield colors[i++ % colors.length];
  }
}

export function colorPalette(colors: string[]) {
  const colorGen = colorGenerator(colors);
  return {
    next() {
      return colorGen.next().value;
    },
  };
}
