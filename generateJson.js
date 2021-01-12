const program = require('commander').program;
const Csv = require('objects-to-csv');
const moment = require('moment');

program.requiredOption('-f, --format <string>', 'The output format, can be JSON or CSV', 'csv');
program.requiredOption('-a, --amount <number>', 'The amount of records to generate', 380);

const data = [];
const startDate = '01012020';

for (let i = 0; i < program.amount; i++) {
  data.push({
    date: generateDate(startDate, i),
    value: generateIncreasingLikertValue(i)
  });
}

console.log(data.slice(0,10));

(async () => {
  console.log('Writing CSV...');

  const writer = new Csv(data);
  await writer.toDisk('./likert-year.csv')

  console.log('...done!');
})();

function generateDate(startDate, daysPassed) {
  return moment(startDate, 'DDMMYYYY').add(daysPassed, 'days').format('MM-DD-YYYY');
}

function generateIncreasingLikertValue(daysPassed) {
  const baseAverage = 6;
  const maxAverage = 9;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount)
    + Math.random();

  return currentAverage;
}
