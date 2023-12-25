const mappingArray = (data, valueKey, labelCallback, valueCallback) => {
  return (
    data?.map((item) => ({
      value: item[valueKey] || valueCallback(item),
      label: labelCallback(item),
    })) || []
  );
};
export default mappingArray;
