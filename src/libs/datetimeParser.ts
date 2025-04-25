export const dateParser = (datetime: Date) => {
  const date = datetime.toString().split("T")[0];
  const dateSplit = date.split("-");
  const month = dateSplit[1];
  const day = dateSplit[2];
  const year = dateSplit[0];

  const dayParser = (day: string) => {
    switch (day[day.length - 1]) {
      case "1":
        return `${day}st`;
      case "2":
        return `${day}nd`;
      case "3":
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  switch (month) {
    case "01":
      return `January ${dayParser(day)}, ${year}`;
    case "02":
      return `February ${dayParser(day)} Februari ${year}`;
    case "03":
      return `March ${dayParser(day)}, ${year}`;
    case "04":
      return `April ${dayParser(day)}, ${year}`;
    case "05":
      return `May ${dayParser(day)}, ${year}`;
    case "06":
      return `June ${dayParser(day)}, ${year}`;
    case "07":
      return `July ${dayParser(day)}, ${year}`;
    case "08":
      return `August ${dayParser(day)}, ${year}`;
    case "09":
      return `September ${dayParser(day)}, ${year}`;
    case "10":
      return `October ${dayParser(day)}, ${year}`;
    case "11":
      return `November ${dayParser(day)}, ${year}`;
    case "12":
      return `December ${dayParser(day)}, ${year}`;
  }
};

export const timeParser = (datetime: Date) => {
  const time = datetime.toString().split("T")[1];
  const timeSplit = time.split(":");
  const hours = timeSplit[0];
  const minutes = timeSplit[1];

  return hours + "." + minutes;
};
