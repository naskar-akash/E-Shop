const dateTime = () => {
  const dateObj = new Date();

  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yy = String(dateObj.getFullYear());

  let hh = dateObj.getHours();
  const m = String(dateObj.getMinutes()).padStart(2, "0");
  const s = String(dateObj.getSeconds()).padStart(2, "0");

  const ampm = hh >=12 ? "PM" : "AM";
  hh = hh % 12 || 12;
  const h = String(hh).padStart(2,"0");

  return {
    date: `${dd}-${mm}-${yy}`,
    time: `${h}:${m}:${s} ${ampm}`,
  };
};

export default dateTime;
