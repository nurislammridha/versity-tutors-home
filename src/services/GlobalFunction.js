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

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Extract date components
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });

  return `${day} ${month} ${time}`;
};