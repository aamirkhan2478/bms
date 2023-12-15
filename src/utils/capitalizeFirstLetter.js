const capitalizeFirstLetter = (value) => {
  return value && value.length > 0
    ? value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : value;
};

export default capitalizeFirstLetter;
