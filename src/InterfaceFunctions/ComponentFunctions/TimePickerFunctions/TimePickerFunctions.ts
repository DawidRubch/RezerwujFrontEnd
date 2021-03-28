export class TimePickerFunctions {
  generateTime(date: Date) {
    let [hour, minutes] = [date.getHours(), date.getMinutes()];

    //Start from 0:00, if its not today
    if (new Date().toDateString() !== date.toDateString()) {
      hour = 0;
      minutes = 0;
    }

    if (minutes > 30) {
      minutes = 0;
      hour++;
    } else {
      minutes = 30;
    }
    let hourAndMinutesArr: string[] = new Array();

    for (var i = 0; i < 48; i++) {
      let hourAndMinutesString = `🕒 ${hour}:${minutes === 0 ? "00" : "30"}`;

      hourAndMinutesArr.push(hourAndMinutesString);
      minutes += 30;
      if (minutes === 60) {
        hour++;
        minutes = 0;
      } else if (hour === 24) {
        break;
      }
    }
    return hourAndMinutesArr;
  }
}
