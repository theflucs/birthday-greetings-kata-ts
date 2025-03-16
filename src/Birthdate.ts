export class Birthdate {
  private readonly date: Date;

  constructor(dateString: string) {
    const [yyyy, mm, dd] = dateString.split("/").map(Number);
    this.date = new Date(yyyy, mm - 1, dd);
  }

  isSameDay(today: Date): boolean {
    return (
      this.date.getMonth() === today.getMonth() &&
      this.date.getDate() === today.getDate()
    );
  }
}
