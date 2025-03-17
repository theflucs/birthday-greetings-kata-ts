import { BirthDate } from "../../domain/BirthDate";
import { EmailAddress } from "../../domain/EmailAddress";
import { Employee } from "../../domain/Employee";
import { Name } from "../../domain/Name";
import { findBirthdayEmployees } from "../../utils";

describe("findBirthdayEmployees", () => {
  it("should return employees whose birthday is today", () => {
    const today = new BirthDate("2025-03-17");
    const employeeWithBirthday = new Employee(
      new Name("Doe", "John"),
      new BirthDate("1990-03-17"),
      new EmailAddress("john.doe@example.com")
    );
    const employeeWithoutBirthday = new Employee(
      new Name("Smith", "Alice"),
      new BirthDate("1992-06-21"),
      new EmailAddress("alice.smith@example.com")
    );

    const employees = [employeeWithBirthday, employeeWithoutBirthday];
    const result = findBirthdayEmployees(employees, today);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(employeeWithBirthday);
  });

  it("should return an empty array if no employees have a birthday today", () => {
    const today = new BirthDate("2025-03-17");
    const employee1 = new Employee(
      new Name("Doe", "John"),
      new BirthDate("1990-04-01"),
      new EmailAddress("john.doe@example.com")
    );
    const employee2 = new Employee(
      new Name("Smith", "Alice"),
      new BirthDate("1992-06-21"),
      new EmailAddress("alice.smith@example.com")
    );

    const employees = [employee1, employee2];
    const result = findBirthdayEmployees(employees, today);

    expect(result).toHaveLength(0);
  });
});
