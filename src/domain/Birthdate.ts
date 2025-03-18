export class BirthDate {
  private readonly date: Date;

  constructor(yyyyMMdd: string) {
    this.date = new Date(yyyyMMdd);
  }

  isSameDay(other: BirthDate): boolean {
    return this.matchesSameDay(other) || this.matchesLeapYearBirthday(other);
  }

  private matchesSameDay(other: BirthDate): boolean {
    return this.month() === other.month() && this.day() === other.day();
  }

  private matchesLeapYearBirthday(other: BirthDate): boolean {
    return this.isFeb29() && other.isNonLeapYearFeb28();
  }

  private isFeb29(): boolean {
    return this.month() === 1 && this.day() === 29;
  }

  private isNonLeapYearFeb28(): boolean {
    return !LeapYear.isLeapYear(this.year()) && this.isFeb28();
  }

  private isFeb28(): boolean {
    return this.month() === 1 && this.day() === 28;
  }

  private year(): number {
    return this.date.getFullYear();
  }

  private month(): number {
    return this.date.getMonth();
  }

  private day(): number {
    return this.date.getDate();
  }
}

class LeapYear {
  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
