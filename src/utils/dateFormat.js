import moment from "moment";

const dateFormat = (date, format = "MM/DD/YYYY") => {
  return moment(date).format(format);
};

export default dateFormat;
