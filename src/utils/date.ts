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