const deliveryDate = (date, days) => {
  const [dd, mm, yy] = date.split("-").map(Number);

  const dateObj = new Date(yy, mm - 1, dd);
  dateObj.setDate(dateObj.getDate() + days);

  const newDD = String(dateObj.getDate()).padStart(2, "0");
  const newMM = String(dateObj.getMonth() + 1).padStart(2, "0");
  const newYY = dateObj.getFullYear();

  return `${newDD}-${newMM}-${newYY}`;
};

export default deliveryDate;