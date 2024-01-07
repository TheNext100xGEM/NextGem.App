import moment from 'moment'

const formatReadableDate = (dateString: string): string => {
  const formattedDate = moment(dateString).format('MMMM Do YYYY, h:mm a')
  return formattedDate
}

export { formatReadableDate }