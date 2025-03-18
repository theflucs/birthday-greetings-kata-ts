import { BirthDate } from "../../domain/BirthDate";

describe("BirthDate", () => {
  it("should match the same day and month", () => {
    const birthDate = new BirthDate("1990-05-21");
    const today = new BirthDate("2024-05-21");
    expect(birthDate.isSameDay(today)).toBe(true);
  });

  it("should not match if the day is different", () => {
    const birthDate = new BirthDate("1990-05-21");
    const today = new BirthDate("2024-05-22");
    expect(birthDate.isSameDay(today)).toBe(false);
  });

  it("should not match if the month is different", () => {
    const birthDate = new BirthDate("1990-05-21");
    const today = new BirthDate("2024-06-21");
    expect(birthDate.isSameDay(today)).toBe(false);
  });

  it("should match Feb 29 birthdays on Feb 29 in a leap year", () => {
    const birthDate = new BirthDate("2000-02-29");
    const today = new BirthDate("2024-02-29");
    expect(birthDate.isSameDay(today)).toBe(true);
  });

  it("should not match Dec 31 with Jan 1", () => {
    const newYearEve = new BirthDate("2023-12-31");
    const newYearDay = new BirthDate("2024-01-01");
    expect(newYearEve.isSameDay(newYearDay)).toBe(false);
  });

  it("should correctly match the same birthday across different years", () => {
    const birthDate = new BirthDate("1995-08-15");
    const today = new BirthDate("2024-08-15");
    expect(birthDate.isSameDay(today)).toBe(true);
  });

  it("should not match different years if day and month are different", () => {
    const birthDate = new BirthDate("1995-08-15");
    const today = new BirthDate("2024-07-15");
    expect(birthDate.isSameDay(today)).toBe(false);
  });

  it("should match Feb 29 birthdays on Feb 28 in a non-leap year", () => {
    const birthDate = new BirthDate("2000-02-29");
    const today = new BirthDate("2023-02-28");
    expect(birthDate.isSameDay(today)).toBe(true);
  });

  it("should not match Feb 29 birthdays on Feb 28 in a leap year", () => {
    const birthDate = new BirthDate("2000-02-29");
    const today = new BirthDate("2024-02-28");

    expect(birthDate.isSameDay(today)).toBe(false);
  });
});
