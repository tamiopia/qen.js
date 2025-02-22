# qen.js 🇪🇹

A utility package for Ethiopian date conversion, payment scheduling, and holiday checks.

## Features

- Convert between Ethiopian and Gregorian dates.
- Generate payment schedules (e.g., monthly, quarterly).
- Check Ethiopian public holidays.
- Format dates in Amharic.
- Calculate late fees for overdue payments.

---

## Installation

Install `qen.js` using npm:

```bash
npm install qen.js
```

---

## Usage

### 1. Convert Gregorian to Ethiopian Date
Convert a Gregorian date to an Ethiopian date.

```javascript
const { EthiopianDate } = require('qen.js');

// Convert a Gregorian date to Ethiopian date
const gregorianDate = new Date(2023, 9, 30); // October 30, 2023
const ethiopianDate = EthiopianDate.fromGregorian(gregorianDate);

console.log(ethiopianDate.format('YYYY-MM-DD')); // Output: 2015-02-20
console.log(ethiopianDate.formatAmharic()); // Output: 20 የካቲት 2015
```

**Response:**
```bash
2015-02-20
20 የካቲት 2015
```

---

### 2. Generate a Payment Schedule
Generate a payment schedule for a given start date.

```javascript
const startDate = new EthiopianDate(2015, 2, 20); // 20 Yekatit 2015
const schedule = startDate.generatePaymentSchedule(1, 12); // Monthly payments for 1 year

console.log('Payment Schedule:');
schedule.forEach((date, index) => {
  console.log(`Payment ${index + 1}: ${date.formatAmharic()}`);
});
```

**Response:**
```bash
Payment Schedule:
Payment 1: 20 የካቲት 2015
Payment 2: 20 መጋቢት 2015
Payment 3: 20 ሚያዝያ 2015
Payment 4: 20 ግንቦት 2015
Payment 5: 20 ሰኔ 2015
Payment 6: 20 ሀምሌ 2015
Payment 7: 20 ኖሀሰ 2015
Payment 8: 20 ፓጩመ 2015
Payment 9: 20 መሳክረም 2016
Payment 10: 20 ጥዅምት 2016
Payment 11: 20 ህዳር 2016
Payment 12: 20 ታውሳስ 2016
```

---

### 3. Check if a Date is a Holiday
Check if a specific date is an Ethiopian public holiday.

```javascript
const isHoliday = EthiopianDate.isHoliday(2015, 1, 1); // Ethiopian New Year
console.log(isHoliday); // Output: Ethiopian New Year
```

**Response:**
```bash
Ethiopian New Year
```

---

### 4. Calculate Late Fees
Calculate late fees for overdue payments.

```javascript
const dueDate = new EthiopianDate(2015, 2, 20); // 20 Yekatit 2015
const paymentDate = new EthiopianDate(2015, 2, 25); // Payment made on 25 Yekatit 2015

const lateFee = dueDate.calculateLateFee(dueDate, paymentDate, 10); // ETB 10 per day
console.log(`Late Fee: ETB ${lateFee}`); // Output: Late Fee: ETB 50
```

**Response:**
```bash
Late Fee: ETB 50
```

---

### 5. Get the Current Ethiopian Date and Time
Get the current Ethiopian date and time.

```javascript
const currentDateTime = EthiopianDate.getCurrentDateTimeInEthiopia();
console.log('Current Date:', currentDateTime.date.formatAmharic());
console.log('Current Time:', currentDateTime.time); // 12-hour format
```

**Response (example):**
```bash
Current Date: 14 የካቲት 2015
Current Time: 2:30 PM
```

---

## Use Cases

1. **Rental Management Systems**
   - Generate payment schedules for tenants using the Ethiopian calendar.
   - Calculate late fees for overdue payments.
   - Display due dates in Amharic for better user experience.

2. **Subscription Services**
   - Manage subscription renewals and billing cycles in the Ethiopian calendar.
   - Notify users of upcoming payments in their local date format.

3. **Event Planning**
   - Schedule events and check for Ethiopian public holidays.
   - Avoid scheduling events on holidays or adjust dates accordingly.

4. **Financial Applications**
   - Calculate interest or penalties based on Ethiopian dates.
   - Generate reports with dates formatted in Amharic.

5. **E-commerce Platforms**
   - Display order delivery dates in the Ethiopian calendar.
   - Manage promotions and discounts tied to Ethiopian holidays.

---

## Contributing

Contributions are welcome! If you have any ideas or suggestions, please open an issue or submit a pull request on [GitHub](https://github.com/your-repo-link).

To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

