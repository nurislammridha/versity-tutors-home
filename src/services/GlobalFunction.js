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
  { id: "createRole", name: 'Create Role' },
];
export const getUserPermissions = () => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log('userData', userData)
    return userData?.assignServices || {};
  } catch {
    return {};
  }
};
export const filterByModerator = (arr, userId) => {
  console.log('arr', arr)
  console.log('userId', userId)
  return arr.filter(item =>
    item.assignedModerator === userId || item.assignedModerator === null || item.assignedModerator === undefined
  );
};
export function getTimeDifference(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  let diffMs = endDate - startDate;

  if (diffMs < 0) return "Invalid time range";

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= diffDays * (1000 * 60 * 60 * 24);

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= diffHours * (1000 * 60 * 60);

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= diffMinutes * (1000 * 60);

  let result = "";
  if (diffDays > 0) result += `${diffDays} day${diffDays > 1 ? "s" : ""} `;
  if (diffHours > 0) result += `${diffHours} hour${diffHours > 1 ? "s" : ""} `;
  if (diffMinutes > 0) result += `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;

  return result.trim() || "Less than a minute";
}
