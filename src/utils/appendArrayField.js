const appendArrayField = (array, field, formData) => {
  if (field !== "images") {
    array.forEach((item, index) => {
      formData.append(`${field}[${index}]`, item);
    });
  } else {
    array.forEach((item) => {
      formData.append(field, item);
    });
  }
};

export default appendArrayField;
