import { Employee } from "./Employee";
import { Birthdate } from "./Birthdate";

export function parseCsvToEmployees(csvData: string): Employee[] {
  return csvData
    .trim()
    .split("\n")
    .slice(1) // skip the header
    .map((line) => {
      const [lastName, firstName, birthDate, email] = line.split(", ");
      return new Employee(firstName, lastName, new Birthdate(birthDate), email);
    });
}
