export function getDaysSinceRegistration(dateString: string): string {

  const registrationDate = new Date(dateString);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - registrationDate.getTime();

  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let daysWord: string;
  const lastDigit = daysDiff % 10;
  const lastTwoDigits = daysDiff % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    daysWord = 'дней';
  } else if (lastDigit === 1) {
    daysWord = 'день';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    daysWord = 'дня';
  } else {
    daysWord = 'дней';
  }

  return `${daysDiff} ${daysWord}`;
}
