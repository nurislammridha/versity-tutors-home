export const GlobalOptions = (list, name, value) => {
  let arr = [];
  if (list) {
    list.forEach((item) => {
      const obj = {
        label: item[name],
        value: item[value],
      };
      arr.push(obj);
    });
  }
  return arr;
};

export const calculateTotalPrice = (reportConnectionArrList) => {
  return reportConnectionArrList.reduce((total, item) => {
    return total + (item.connectionPackageId?.price || 0);
  }, 0);
};