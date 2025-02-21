const { DateTime } = require('luxon');

class EthiopianDate {
  constructor(year, month, day, hour = 0, minute = 0, second = 0) {
    if (!EthiopianDate.isValidDate(year, month, day)) {
      throw new Error('Invalid Ethiopian date.');
    }
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  // Check if a year is a leap year
  static isLeapYear(year) {
    return year % 4 === 3; // Ethiopian leap years occur every 4 years, offset by 3
  }

  // Validate an Ethiopian date
  static isValidDate(year, month, day) {
    if (month < 1 || month > 13) return false;
    if (day < 1 || day > 30) return false;
    if (month === 13 && day > (this.isLeapYear(year) ? 6 : 5)) return false;
    return true;
  }

  // Convert Gregorian date to Ethiopian date (including time)
  static fromGregorian(date) {
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1;
    const gregorianDay = date.getDate();
    const gregorianHour = date.getHours();
    const gregorianMinute = date.getMinutes();
    const gregorianSecond = date.getSeconds();

    const ethYear = gregorianYear - 8;
    const ethMonth = gregorianMonth >= 9 ? gregorianMonth - 8 : gregorianMonth + 4;
    const ethDay = gregorianDay - 7;

    return new EthiopianDate(ethYear, ethMonth, ethDay, gregorianHour, gregorianMinute, gregorianSecond);
  }

  // Convert Ethiopian date to Gregorian date
  toGregorian() {
    const gregorianYear = this.year + 8;
    const gregorianMonth = this.month <= 4 ? this.month + 8 : this.month - 4;
    const gregorianDay = this.day;

    return new Date(gregorianYear, gregorianMonth - 1, gregorianDay, this.hour, this.minute, this.second);
  }

  // Format the Ethiopian date
  format(formatString) {
    return formatString
      .replace('YYYY', this.year)
      .replace('MM', String(this.month).padStart(2, '0'))
      .replace('DD', String(this.day).padStart(2, '0'))
      .replace('MMMM', EthiopianDate.getMonthName(this.month));
  }

  // Get the name of the Ethiopian month
  static getMonthName(month) {
    const monthNames = [
      'Meskerem', 'Tikimit', 'Hidar', 'Tahesas', 'Tir', 'Yekatit', 'Megabit',
      'Miazia', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
    ];
    return monthNames[month - 1];
  }

  // Format the date in Amharic
  formatAmharic() {
    const monthNamesAmharic = [
      'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት', 'መጋቢት',
      'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
    ];
    return `${this.day} ${monthNamesAmharic[this.month - 1]} ${this.year}`;
  }

  // Add days to the current date
  addDays(days) {
    this.day += days;
    while (this.day > 30) {
      this.day -= 30;
      this.month++;
      if (this.month > 13) {
        this.month = 1;
        this.year++;
      }
    }
    return this;
  }

  // Calculate the difference between two Ethiopian dates
  difference(otherDate) {
    const thisTotalDays = this.year * 365 + this.month * 30 + this.day;
    const otherTotalDays = otherDate.year * 365 + otherDate.month * 30 + otherDate.day;
    return Math.abs(thisTotalDays - otherTotalDays);
  }

  // Check if the date is before another date
  isBefore(otherDate) {
    if (this.year < otherDate.year) return true;
    if (this.year === otherDate.year && this.month < otherDate.month) return true;
    if (this.year === otherDate.year && this.month === otherDate.month && this.day < otherDate.day) return true;
    return false;
  }

  // Check if the date is after another date
  isAfter(otherDate) {
    return !this.isBefore(otherDate) && !this.isEqual(otherDate);
  }

  // Check if the date is equal to another date
  isEqual(otherDate) {
    return this.year === otherDate.year && this.month === otherDate.month && this.day === otherDate.day;
  }

  // Calculate the next payment due date
  calculateDueDate(frequencyMonths = 1) {
    const dueDate = new EthiopianDate(this.year, this.month, this.day);
    dueDate.month += frequencyMonths;
    if (dueDate.month > 13) {
      dueDate.month -= 13;
      dueDate.year++;
    }
    return dueDate;
  }

  // Generate a payment schedule
  generatePaymentSchedule(frequencyMonths = 1, numberOfPayments = 12) {
    const schedule = [];
    for (let i = 0; i < numberOfPayments; i++) {
      const dueDate = this.calculateDueDate(frequencyMonths * i);
      schedule.push(dueDate);
    }
    return schedule;
  }

  // Check if the date is a holiday
  static isHoliday(year, month, day) {
    const holidays = {
      '01-01': 'Ethiopian New Year',
      '01-17': 'Meskel',
      // Add more holidays as needed
    };
    const key = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays[key] || null;
  }

  // Calculate late fees
  calculateLateFee(dueDate, paymentDate, dailyFee = 10) {
    if (paymentDate.isBefore(dueDate)) return 0;
    const daysLate = dueDate.difference(paymentDate);
    return daysLate * dailyFee;
  }

  // Get the current date and time in Ethiopia
  static getCurrentDateTimeInEthiopia() {
    const now = DateTime.now().setZone('Africa/Addis_Ababa');
    const ethiopianDate = EthiopianDate.fromGregorian(now.toJSDate());
    return {
      date: ethiopianDate,
      time: now.toLocaleString(DateTime.TIME_SIMPLE), // 12-hour format
    };
  }
}

// Utility functions
const getCurrentEthiopianDate = () => EthiopianDate.fromGregorian(new Date());
const differenceBetweenDates = (date1, date2) => date1.difference(date2);

// Export the EthiopianDate class and utility functions
module.exports = {
  EthiopianDate,
  getCurrentEthiopianDate,
  differenceBetweenDates,
};