import { Employee } from "./domain/Employee";
import { EmailAddress } from "./domain/EmailAddress";
import { Name } from "./domain/Name";
import { BirthDate } from "./domain/BirthDate";

export function parseCsvToEmployees(csvData: string): Employee[] {
  return csvData
    .trim()
    .split("\n")
    .slice(1) // skip the header
    .map((line) => {
      const [lastName, firstName, birthDate, email] = line.split(", ");
      return new Employee(
        new Name(lastName, firstName),
        new BirthDate(birthDate),
        new EmailAddress(email)
      );
    });
}
