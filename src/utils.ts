import { Employee } from "./domain/Employee";
import { EmailAddress } from "./domain/EmailAddress";
import { Name } from "./domain/Name";
import { EmailService } from "./services/EmailService";
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

export function findBirthdayEmployees(
  employees: Employee[],
  today: BirthDate
): Employee[] {
  return employees.filter((employee) => employee.hasBirthdayOn(today));
}

export function sendBirthdayEmail(
  employee: Employee,
  emailService: EmailService
): void {
  const email = employee.getEmailAddress();

  if (!email.isValid()) return;

  emailService.send(
    email,
    "Happy Birthday!",
    `Happy birthday, dear ${employee.getFirstName()}!`
  );
}

export function logInvalidEmail(employee: Employee): void {
  const email = employee.getEmailAddress();

  console.warn(
    `Skipping email for ${employee.getFullName()} - Invalid email: ${email.value()}`
  );
}
