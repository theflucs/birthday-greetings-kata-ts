import { Employee } from "../../domain/Employee";
import { BirthDate } from "../../domain/BirthDate";
import { parseCsvToEmployees } from "../../utils";

describe("parseCsvToEmployees", () => {
  it("should correctly parse a valid CSV string", () => {
    const csvData = `last_name, first_name, date_of_birth, email
Doe, John, 1982/10/08, john.doe@example.com
Ann, Mary, 1975/09/11, mary.ann@example.com`;

    const employees: Employee[] = parseCsvToEmployees(csvData);

    expect(employees).toHaveLength(2);

    expect(employees[0]).toBeInstanceOf(Employee);
    expect(employees[0].getFirstName()).toBe("John");
    expect(employees[0].getEmailAddress().value()).toBe("john.doe@example.com");
    expect(employees[0].hasBirthdayOn(new BirthDate("1982-10-08"))).toBe(true);

    expect(employees[1]).toBeInstanceOf(Employee);
    expect(employees[1].getFirstName()).toBe("Mary");
    expect(employees[1].getEmailAddress().value()).toBe("mary.ann@example.com");
    expect(employees[1].hasBirthdayOn(new BirthDate("1975-09-11"))).toBe(true);
  });

  it("should return an empty array for an empty CSV string", () => {
    const csvData = "last_name, first_name, date_of_birth, email";
    const employees: Employee[] = parseCsvToEmployees(csvData);
    expect(employees).toHaveLength(0);
  });
});
