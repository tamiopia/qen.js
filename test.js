const { EthiopianDate } = require('./index');

const currentDateTime = EthiopianDate.getCurrentDateTimeInEthiopia();
console.log('Current Ethiopian Date:', currentDateTime.date);
console.log('Current Time in Ethiopia:', currentDateTime.time);

const startDate = new EthiopianDate(2017, 2, 20); // 20 Yekatit 2015
const schedule = startDate.generatePaymentSchedule(2, 12); // Monthly payments for 1 year
console.log(schedule.map(date => date.format('YYYY-MM-DD')));