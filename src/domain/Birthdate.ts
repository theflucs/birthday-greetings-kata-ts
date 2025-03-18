export class BirthDate {
  private readonly date: Date;

  constructor(yyyyMMdd: string) {
    this.date = new Date(yyyyMMdd);
  }

  isSameDay(otherDate: BirthDate): boolean {
    if (this.isFeb29()) {
      if (!otherDate.isLeapYear() && otherDate.isFeb28()) {
        return true;
      }
    }

    return (
      this.date.getMonth() === otherDate.date.getMonth() &&
      this.date.getDate() === otherDate.date.getDate()
    );
  }

  private isLeapYear(): boolean {
    const year = this.date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  private isFeb29(): boolean {
    return this.getMonth() === 1 && this.getDay() === 29;
  }

  private isFeb28(): boolean {
    return this.getMonth() === 1 && this.getDay() === 28;
  }

  getMonth(): number {
    return this.date.getMonth();
  }

  getDay(): number {
    return this.date.getDate();
  }
}
