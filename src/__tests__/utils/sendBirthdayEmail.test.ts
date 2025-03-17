import { BIRTHDAY_EMAIL_SUBJECT } from "../../constants";
import { BirthDate } from "../../domain/BirthDate";
import { EmailAddress } from "../../domain/EmailAddress";
import { Employee } from "../../domain/Employee";
import { Name } from "../../domain/Name";
import { EmailService } from "../../services/EmailService";
import { generateEmailBody, sendBirthdayEmail } from "../../utils";

describe("sendBirthdayEmail", () => {
  let mockEmailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    mockEmailService = {
      send: jest.fn(),
    };
  });

  it("should send an email with correct subject and body if the employee's email is valid", () => {
    const employee = new Employee(
      new Name("Doe", "John"),
      new BirthDate("1990-03-17"),
      new EmailAddress("john.doe@example.com")
    );

    sendBirthdayEmail(employee, mockEmailService);

    expect(mockEmailService.send).toHaveBeenCalledWith(
      employee.getEmailAddress(),
      BIRTHDAY_EMAIL_SUBJECT,
      generateEmailBody(employee.getFirstName())
    );
  });

  it("should not send an email if the employee's email is invalid", () => {
    const employee = new Employee(
      new Name("Doe", "John"),
      new BirthDate("1990-03-17"),
      new EmailAddress("invalid-email")
    );

    sendBirthdayEmail(employee, mockEmailService);

    expect(mockEmailService.send).not.toHaveBeenCalled();
  });
});
