const deliveryDate = (date, days) => {
  const parts = date.split("-").map((s) => s.trim());

  let [ddStr, mmStr, yyStr] = parts;
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  let yy = Number(yyStr);

  // Support two-digit years (assume 2000-2099)
  if (yyStr.length === 2) {
    yy = 2000 + yy;
  }

  // Use UTC to avoid timezone/DST offset issues when adding days
  const dateObj = new Date(Date.UTC(yy, mm - 1, dd));
  const addDays = Number(days) || 0;
  dateObj.setUTCDate(dateObj.getUTCDate() + addDays);

  const newDD = String(dateObj.getUTCDate()).padStart(2, "0");
  const newMM = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const newYY = dateObj.getUTCFullYear();

  return `${newDD}-${newMM}-${newYY}`;
};

export default deliveryDate;
