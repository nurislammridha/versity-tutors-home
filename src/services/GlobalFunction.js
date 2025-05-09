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
export const roleTypeOption = () => {
  return [
    {
      label: "Moderator",
      value: "Moderator"
    },
    {
      label: "Manager",
      value: "Manager"
    }
  ]

}

export const servicesListArr = () => [
  { id: "class", name: 'Class' },
  { id: "subject", name: 'Subject' },
  { id: "division", name: 'Division' },
  { id: "district", name: 'District' },
  { id: "subDistrict", name: 'Sub District' },
  { id: "area", name: 'Area' },
  { id: "package", name: 'Package' },
  { id: "tutorManagement", name: 'Tutor Management' },
  { id: "studentManagement", name: 'Student Management' },
  { id: "manualTutorRequest", name: 'Manual Tutor Request' },
];