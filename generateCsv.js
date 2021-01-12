const program = require('commander').program;
const Csv = require('objects-to-csv');
const moment = require('moment');

program.requiredOption('-a, --amount <number>', 'The amount of records to generate', 380);

const likertData = [];
const ticketsData = [];

const startDate = '01012020';

for (let i = 0; i < program.amount; i++) {
  likertData.push({
    date: generateDate(startDate, i),
    value: generateIncreasingLikertValue(i)
  });

  ticketsData.push({
    date: generateDate(startDate, i),
    value: generateTicketsValue(i)
  });
}

console.log(likertData.slice(0,10));

(async () => {
  console.log('Writing CSV...');

  await (new Csv(likertData)).toDisk('./likert-year.csv');

  await (new Csv(ticketsData)).toDisk('./tickets-year.csv')

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

function generateTicketsValue(daysPassed) {
  const baseAverage = 50;
  const maxAverage = 20;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount)
    + Math.random() * 8;

  return currentAverage;
}
