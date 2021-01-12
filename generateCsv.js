const program = require('commander').program;
const Csv = require('objects-to-csv');
const moment = require('moment');

program.requiredOption('-a, --amount <number>', 'The amount of records to generate', 380);

const likertData = [];
const ticketsData = [];
const callsData = [];

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

  callsData.push({
    date: generateDate(startDate, i),
    value: generateCallRequestsValue(i)
  });
}

console.log(likertData.slice(0,10));

(async () => {
  console.log('Writing CSV...');

  await (new Csv(likertData)).toDisk('./likert-year.csv');

  await (new Csv(ticketsData)).toDisk('./tickets-year.csv')

  await (new Csv(callsData)).toDisk('./calls-year.csv')

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
    + (Math.random() - 0.5);

  return currentAverage;
}

function generateTicketsValue(daysPassed) {
  const baseAverage = 15;
  const maxAverage = 5;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount)
    + (Math.random() * 8 - 4);

  return Math.max(Math.round(currentAverage), 0);
}

function generateCallRequestsValue(daysPassed) {
  const baseAverage = 30;
  const maxAverage = 20;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount)
    + (Math.random() * 20 - 10);

  return Math.max(Math.round(currentAverage), 0);
}
