import { Employee } from "./domain/Employee";
import { EmailAddress } from "./domain/EmailAddress";
import { Name } from "./domain/Name";
import { EmailService } from "./services/EmailService";
import { BirthDate } from "./domain/BirthDate";
import { BIRTHDAY_EMAIL_SUBJECT } from "./constants";

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
  const subject = BIRTHDAY_EMAIL_SUBJECT;
  const body = generateEmailBody(employee.getFirstName());

  if (!email.isValid()) return;

  emailService.send(email, subject, body);
}

export function logInvalidEmail(employee: Employee): void {
  const email = employee.getEmailAddress();

  console.warn(
    `Skipping email for ${employee.getFullName()} - Invalid email: ${email.value()}`
  );
}
export function generateEmailBody(recipientName: string): string {
  return `Happy birthday, dear ${recipientName}!`;
}
