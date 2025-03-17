import { BirthDate } from "../../domain/BirthDate";
import { Employee } from "../../domain/Employee";
import { csvParser } from "../../utils";

describe("csvParser", () => {
  it("should correctly parse a valid CSV string", () => {
    const csvData = `last_name,first_name,date_of_birth,email
Doe,John,1982/10/08,john.doe@example.com
Ann,Mary,1975/09/11,mary.ann@example.com`;

    const employees: Employee[] = csvParser(csvData);

    expect(employees).toHaveLength(2);
    expect(employees[0]).toBeInstanceOf(Employee);
    expect(employees[0].getFirstName()).toBe("John");
    expect(employees[0].getEmailAddress().value()).toBe("john.doe@example.com");
    expect(employees[0].hasBirthdayOn(new BirthDate("1982-10-08"))).toBe(true);
  });

  it("should ensure spaces after commas do not affect parsing", () => {
    const csvData = `last_name, first_name,date_of_birth ,email
Doe, John ,1982/10/08 , john.doe@example.com
Ann,Mary, 1975/09/11,  mary.ann@example.com`;

    const employees: Employee[] = csvParser(csvData);

    expect(employees).toHaveLength(2);

    expect(employees[0].getFirstName()).toBe("John");
    expect(employees[0].getEmailAddress().value()).toBe("john.doe@example.com");

    expect(employees[1].getFirstName()).toBe("Mary");
    expect(employees[1].getEmailAddress().value()).toBe("mary.ann@example.com");
  });

  it("should return an empty array for an empty CSV string", () => {
    const csvData = "last_name, first_name, date_of_birth, email";
    const employees: Employee[] = csvParser(csvData);
    expect(employees).toHaveLength(0);
  });
});
