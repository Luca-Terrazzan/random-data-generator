const program = require('commander').program;
const Csv = require('objects-to-csv');
const moment = require('moment');

program.requiredOption('-a, --amount <number>', 'The amount of records to generate', 380);

const likertData = [];
const ticketsData = [];
const callsData = [];
const renewalsData = [];
const sessionsData = [];

const startDate = '01012020';
const maxRenewalsDataPoints = 15;

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

  sessionsData.push({
    date: generateDate(startDate, i),
    sessions: generateSessionsData(i),
    significativesessions: generateSignificativeSessionsData(i)
  });
}

for (let i = 1; i < maxRenewalsDataPoints; i++) {
  renewalsData.push({
    hours: i,
    renewalForecast: generateRenewalForecast(i)
  });
}

(async () => {
  console.log('Writing CSV...');

  // await (new Csv(likertData)).toDisk('./likert-year.csv');

  // await (new Csv(ticketsData)).toDisk('./tickets-year.csv')

  // await (new Csv(callsData)).toDisk('./calls-year.csv')

  // await (new Csv(renewalsData)).toDisk('./renewals.csv')

  await (new Csv(sessionsData)).toDisk('./sessions.csv')

  console.log('...done!');
})();

function generateDate(startDate, daysPassed) {
  return moment(startDate, 'DDMMYYYY').add(daysPassed, 'days').format('MM-DD-YYYY');
}

function generateSessionsData(daysPassed) {
  const baseAverage = 1200;
  const maxAverage = 3000;

  console.log('log', Math.log((maxAverage - baseAverage) * (daysPassed / program.amount))); // Add a linear trend that lowers
  const currentAverage =
    baseAverage
    + 100 * Math.log((maxAverage - baseAverage) * (daysPassed / program.amount)) // Add a log trend
    * (daysPassed > 70) // Only start showing a trend after 60 days
    + (Math.random() - 0.5) * 200;

  return currentAverage;
}

function generateSignificativeSessionsData(daysPassed) {
  const baseAverage = 1100;
  const maxAverage = 2700;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount) // Add a linear trend that lowers
                                                                 // tickets down to a minimum average
    * (daysPassed > 70) // Only start showing a trend after 60 days
    + (Math.random() - 0.5) * 200;

  return currentAverage;
}

function generateRenewalForecast(hours) {
  return 15 + (Math.pow(2, hours) / Math.pow(2, maxRenewalsDataPoints) * 85);
}

function generateIncreasingLikertValue(daysPassed) {
  const baseAverage = 6;
  const maxAverage = 8.5;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount) // Add a linear trend that lowers
                                                                 // tickets down to a minimum average
    * (daysPassed > 250) // Only start showing a trend after 60 days
    + (Math.random() - 0.5) * 2;

  return currentAverage;
}

function generateTicketsValue(daysPassed) {
  const baseAverage = 15;
  const maxAverage = 2;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount) // Add a linear trend that lowers
                                                                 // tickets down to a minimum average
    * (daysPassed > 150) // Only start showing a trend after 60 days
    + (Math.random() * 8 - 4);

  return Math.max(Math.round(currentAverage), 0);
}

function generateCallRequestsValue(daysPassed) {
  const baseAverage = 30;
  const maxAverage = 15;

  const currentAverage =
    baseAverage
    + (maxAverage - baseAverage) * (daysPassed / program.amount) // Add a linear trend that lowers
                                                                 // tickets down to a minimum average
    * (daysPassed > 150) // Only start showing a trend after 60 days
    + (Math.random() * 20 - 10);

  return Math.max(Math.round(currentAverage), 0);
}
