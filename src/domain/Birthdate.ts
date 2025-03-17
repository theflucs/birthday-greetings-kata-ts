export class BirthDate {
  private readonly date: Date;

  constructor(yyyyMMdd: string) {
    this.date = new Date(yyyyMMdd);
  }

  isSameDay(otherDate: BirthDate): boolean {
    return (
      this.date.getMonth() === otherDate.date.getMonth() &&
      this.date.getDate() === otherDate.date.getDate()
    );
  }
}
