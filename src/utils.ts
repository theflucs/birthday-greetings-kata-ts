import { Employee } from "./Employee";
import { Birthdate } from "./Birthdate";
import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";

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
