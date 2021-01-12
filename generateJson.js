const program = require('commander').program;
const Csv = require('objects-to-csv');
const moment = require('moment');

program.requiredOption('-f, --format <string>', 'The output format, can be JSON or CSV', 'csv');
program.requiredOption('-a, --amount <number>', 'The amount of records to generate', 380);

const data = [];

for (let i = 0; i < program.amount; i++) {
  data.push({
    date: moment('01012020', 'DDMMYYYY').add(i, 'days').format('MM-DD-YYYY'),
    value: 2
  });
}

console.log(data.slice(0,10));

(async () => {
  console.log('Writing CSV...');

  const writer = new Csv(data);
  await writer.toDisk('./test.csv')

  console.log('...done!');
})();
