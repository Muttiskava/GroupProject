
export function getDates(WeekOffset) {
    const weeks = [];
    const today = new Date();
  
    for (let week = 0; week < 4; week++) {
      const days = [];
  
      today.setDate(today.getDate() + (WeekOffset + (7 * week)));
  
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + (i - today.getDay()) +1 ); //+1 to start on mondays, also yoinked from overflow
        
        const day = {
          name: getDayName(date.getDay()),
          date: date.getDate(),
          id: i + (week * 7),
          weekNumber: getISOWeekNumber(date),
          timeslots: getTimeslotsArray()
        };
  
        days.push(day);
      }
  
      weeks.push(days);
    }
  
    console.log(weeks);
    return weeks;
  }
function getTimeslotsArray() {
    const timeslots = [
        { time: '10:00', booked: false },
        { time: '11:00', booked: false },
        { time: '12:00', booked: false },
        { time: '13:00', booked: false },
        { time: '14:00', booked: false },
        { time: '15:00', booked: false },
        { time: '16:00', booked: false },
        { time: '17:00', booked: false }
    ];

    return timeslots;
}

function getDayName(dayIndex) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[dayIndex];
}

//mega yoinked from StackOverflow
function getISOWeekNumber(date) {
    const target = new Date(date.getTime());
    target.setDate(target.getDate() + 3 - (target.getDay() + 6) % 7);

    const startOfYear = new Date(target.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((target - startOfYear) / 86400000 + 1) / 7);

    return weekNumber;
}