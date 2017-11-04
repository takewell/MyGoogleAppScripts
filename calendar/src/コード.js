function myFunction() {
  createCalender("hoge", 2017, 11, 4);
}

function createCalender(title, year, month, day) {
   const calendar = CalendarApp.getCalendarById("takewell.sot@gmail.com");
  const date = new Date(year, month - 1, day);
  calendar.createAllDayEvent(title, date);
}

function hoge() {
  Logger.log('hoge');
}