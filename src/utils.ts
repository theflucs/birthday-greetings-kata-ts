import { Employee } from "./domain/Employee";
import { Birthdate } from "./domain/Birthdate";
import { EmailAddress } from "./domain/EmailAddress";
import { FullName } from "./domain/FullName";

export function parseCsvToEmployees(csvData: string): Employee[] {
  return csvData
    .trim()
    .split("\n")
    .slice(1) // skip the header
    .map((line) => {
      const [lastName, firstName, birthDate, email] = line.split(", ");
      return new Employee(
        new FullName(firstName, lastName),
        new Birthdate(birthDate),
        new EmailAddress(email)
      );
    });
}
