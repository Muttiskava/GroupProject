import React from 'react';

class BookingSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      timeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      bookings: {},
      currentDate: new Date(),
    };
  }

  handleBookingClick = (day, time) => {
    const bookings = { ...this.state.bookings };
    if (!bookings[day]) {
      bookings[day] = {};
    }
    bookings[day][time] = true;
    this.setState({ bookings });
  };

  handlePrevWeek = () => {
    const { currentDate } = this.state;
    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(prevWeekDate.getDate() - 7);
    this.setState({ currentDate: prevWeekDate });
  };

  handleNextWeek = () => {
    const { currentDate } = this.state;
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    this.setState({ currentDate: nextWeekDate });
  };

  render() {
    const { daysOfWeek, timeslots, bookings, currentDate } = this.state;

    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate()+1 - currentDate.getDay()); // Sätter veckans startdag till måndag

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Sätter veckans slutdag till söndag

    return (
      <div>
        <h1>Booking System</h1>
        <div className="booking-nav">
          <button onClick={this.handlePrevWeek}>Previous Week</button>
          <button onClick={this.handleNextWeek}>Next Week</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              {daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date</td>
              {daysOfWeek.map((day, index) => {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + index);
                return <td key={index}>{date.toLocaleDateString()}</td>;
              })}
            </tr>
            {timeslots.map((time) => (
              <tr key={time}>
                <td>{time}</td>
                {daysOfWeek.map((day, index) => {
                  const date = new Date(weekStart);
                  date.setDate(date.getDate() + index);
                  return (
                    <td
                      key={index}
                      onClick={() => this.handleBookingClick(day, time)}
                      className={bookings[day] && bookings[day][time] ? 'booked' : ''}
                    >
                      {bookings[day] && bookings[day][time] ? 'Booked' : 'Available'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookingSystem;
