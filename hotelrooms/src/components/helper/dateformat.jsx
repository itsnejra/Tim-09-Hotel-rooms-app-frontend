import { parseISO, format } from 'date-fns';

const Date = ({ date }) => {

  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, 'dd/MM/yyyy');

  return (
    <span className="text-gray-500 text-sm">{formattedDate}</span>
  );
};

export default Date;
