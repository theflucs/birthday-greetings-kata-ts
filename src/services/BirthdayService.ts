import { EmployeeProvider } from "../providers/EmployeeProvider";
import { EmailService } from "./EmailService";
import { findBirthdayEmployees, sendBirthdayEmail } from "../utils";
import { BirthDate } from "../domain/BirthDate";

export class BirthdayService {
  constructor(
    private readonly employeeProvider: EmployeeProvider,
    private readonly emailService: EmailService
  ) {}

  async sendGreetings(today: BirthDate): Promise<void> {
    const employees = await this.employeeProvider.fetchEmployees();
    const birthdayEmployees = findBirthdayEmployees(employees, today);

    for (const employee of birthdayEmployees) {
      sendBirthdayEmail(employee, this.emailService);
    }
  }
}
