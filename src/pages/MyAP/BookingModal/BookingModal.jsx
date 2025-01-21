import { useEffect, useState } from 'react';
import { CalendarIcon } from '../Attendance/Attendance.styled';
import {
  BookingModalContainer,
  BookingModalContent,
  ModalHeader,
  ModalHeaderContainer,
} from './BookingModal.styled';
import axios from 'axios';

export const BookingModal = ({ user, language }) => {
  const DATE_BOOKING = 'booking_by_date';
  const EMPLOYEE_BOOKING = 'booking_by_employees';

  const [availableDates, setAvailableDates] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [bookings, setBookings] = useState(DATE_BOOKING);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [selectedDateWithSession, setSelectedDateWithSession] = useState({});

  const groupSessionsByDate = (data) => {

    const grouped = data.map((date) => date.reduce((acc, session) => {
      console.log('qqqqqqqqqqq');
      console.log(session);
      if (!session.datetime) {
        console.warn('Missing datetime:', session);
        return acc;
      }

      const date = session.datetime.split('T')[0];
      acc[date] = acc[date] || [];
      acc[date].push(session);
      return acc;
    }, {}));

    console.log('Grouped sessions by date:', grouped);
    return grouped;
  };
  const fetchAvailableDates = async (employeeId = 0) => {
    const token = localStorage.getItem('token');
    const apiUrl = 'https://5c0a-5-59-198-77.ngrok-free.app/booking/book_dates';
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Accept: 'application/vnd.api.v2+json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1',
          "ngrok-skip-browser-warning": true,
          "Authorization": `Bearer ${token}`,
        },
        query: {
          staffId: employeeId,
        }
      });
      if (response.data.status === 'success') {
        return (response.data.data.bookingDates || []);
      } else {
        console.error('Failed to fetch available dates:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching available dates:', error);
    }
  };

  useEffect(() => {
    setAvailableDates(fetchAvailableDates());
  }, []);

  useEffect(() => {
    const fetchAvailableEmployees = async () => {
      const apiUrl = 'https://5c0a-5-59-198-77.ngrok-free.app/booking/book_staff';
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Accept: 'application/vnd.api.v2+json',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '1',
            "ngrok-skip-browser-warning": true,
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === 'success') {
          setAvailableEmployees(response.data.employees || []);
        } else {
          console.error('Failed to fetch employees:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (bookings === EMPLOYEE_BOOKING) {
      fetchAvailableEmployees();
    }
  }, [bookings]);


  const updateSelectedEmployees = async (employee) => {
    setSelectedDateWithSession({}); // Reset selected date session data
    setSelectedEmployees(() => employee);
    console.log(selectedEmployees);
    const availbleDatesForEmployee = await fetchAvailableDates(selectedEmployees.id);
    console.log(availbleDatesForEmployee);

    if (Array.isArray(availbleDatesForEmployee) && availbleDatesForEmployee.length) {
      const apiUrl = 'https://5c0a-5-59-198-77.ngrok-free.app/booking/book_times';
      try {
        const sessionPromises = availbleDatesForEmployee.map((date) => {
          return axios.get(apiUrl, {
            headers: {
              Accept: 'application/vnd.api.v2+json',
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '1',
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              lang: language || 'ENG',
              staff_id: employee.id, // Use selected employee ID
              date,
            },
          })
            .then((response) => {
              if (response.data.status === 'success') {
                return response.data;
              }
              return null;
            })
            .catch((error) => {
              console.error(`Error fetching sessions for date ${date}:`, error);
              return null;
            })
        });
        const sessionResults = await Promise.all(sessionPromises);
        const availableSessions = sessionResults.filter((result) => result !== null);
        const groupedSessions = groupSessionsByDate(
                availableSessions.map((result) => result.sessions || [])
              );
              setSelectedDateWithSession(groupedSessions);
        console.log(groupedSessions);
      } catch (e) {
        console.log(e);
      }
    }
  }
  const updateBooking = (bookingType) => {
    setBookings(bookingType);
    setAvailableDates([]);
    setSelectedEmployees(null);
    setSelectedDateWithSession({});
  };


  const updateSelectedDate = (date) => {
    setSelectedDateWithSession((prev) => prev[date] || []);
  };


  const bookSession = async (session) => {
    const apiUrl = 'https://5c0a-5-59-198-77.ngrok-free.app/booking/book';
    try {
      const response = await axios.post(apiUrl, {
        headers: {
          Accept: 'application/vnd.api.v2+json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1',
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          lang: language || 'ENG',
          staff_id: selectedEmployees.id,
          date: session.date,
          time: session.time,
        },
      });
      if (response.data.status === 'success') {
        console.log('Successfully booked session:', response.data);
      } else {
        console.error('Failed to book session:', response.data.message);
      }
    } catch (error) {
      console.error('Error booking session:', error);
    }
  }
  return (
    <BookingModalContainer>
      <BookingModalContent>
        <ModalHeaderContainer>
          <ModalHeader>
            <CalendarIcon /> Замовити онлайн заняття
            <button onClick={() => updateBooking(EMPLOYEE_BOOKING)}>Вибрати викладача</button>
            <button onClick={() => updateBooking(DATE_BOOKING)}>Вибрати дату</button>
          </ModalHeader>
        </ModalHeaderContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '500px' }}>
        {(bookings === EMPLOYEE_BOOKING && !Object.keys(selectedDateWithSession).length)  && (
          availableEmployees.length > 0 ? (
            availableEmployees.map((employee) => (
              <button key={employee.id} onClick={() => updateSelectedEmployees(employee)}>
                {employee.name}
              </button>
            ))
          ) : (
            <p>Завантаження викладачів...</p>
          )
        )}

        {bookings === DATE_BOOKING && (
          availableDates.length > 0 ? (
            availableDates.map((date) => (
              <button key={date} onClick={() => updateSelectedDate(date)}>
                {date}
              </button>
            ))
          ) : (
            <p>Завантаження дат...</p>
          )
        )}

        {selectedDateWithSession && selectedDateWithSession.length > 0 && (
          <ul>
            {selectedDateWithSession.map((date, index) => (
              <li key={index}>
                {/* For each date (e.g. 2025-01-03) */}
                {Object.entries(date).map(([dateKey, sessions]) => (
                  <div key={dateKey}>
                    {/* Display the date as title */}
                    <h3>{dateKey}</h3>
                    <ul>
                      {/* Iterate through each session for the given date */}
                      {sessions.map((session, sessionIndex) => (
                        <li key={sessionIndex}>
                          <button onClick={() => bookSession(session)}>{session.time}</button> {/* Display the time */}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      </BookingModalContent>
    </BookingModalContainer>
  );
};
