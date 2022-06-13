import moment from 'moment';

export const getTimeDiff = (date: string | undefined) => {
  const momentDate = moment(date).format('DD MMM YYYY');
  if (moment(date).year < moment().year) return momentDate;
  else return moment(date).fromNow();
};
