import moment from "moment";

const dateFormat = (date) => {
  return moment(date).format("MM/DD/YYYY");
};

export default dateFormat;
