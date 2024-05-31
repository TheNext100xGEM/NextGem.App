import { UserChat } from '@models/Chat';
import moment from 'moment'

const formatReadableDate = (dateString: string): string => {
  const formattedDate = moment(dateString).format('MMMM Do YYYY, h:mm a')
  return formattedDate
}

const filterUsersByDate = (users: UserChat[], days: number): UserChat[] => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 1);

  const dateThreshold = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);

  return users.filter(user => {
    const userDate = new Date(user.date);
    return userDate >= dateThreshold && userDate <= currentDate;
  });
};

export { formatReadableDate, filterUsersByDate }


/**
 * Converts a Unix timestamp to a formatted local date and time string.
 * @param {number} timestamp - The Unix timestamp to convert.
 * @returns {string} - The formatted local date and time string.
 */
export function formatLocalTimestamp(timestamp: number) {
  // Convert the Unix timestamp to milliseconds (JavaScript uses milliseconds)
  const date = new Date(timestamp * 1000);

  // Format the date components
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];

  // Format the time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes}${ampm}`;

  // Create the formatted date and time string
  return `${day} ${month}, ${year} ${formattedTime}`;
}
