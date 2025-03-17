import { BirthdayService } from "../../services/BirthdayService";
import { Employee } from "../../domain/Employee";
import { BirthDate } from "../../domain/BirthDate";
import { EmployeeProvider } from "../../providers/EmployeeProvider";
import { EmailService } from "../../services/EmailService";
import { EmailAddress } from "../../domain/EmailAddress";
import { Name } from "../../domain/Name";

describe("BirthdayService", () => {
  let mockEmployeeProvider: jest.Mocked<EmployeeProvider>;
  let mockEmailService: jest.Mocked<EmailService>;
  let birthdayService: BirthdayService;

  beforeEach(() => {
    mockEmployeeProvider = {
      fetchEmployees: jest.fn(),
    };

    mockEmailService = {
      send: jest.fn(),
    };

    birthdayService = new BirthdayService(
      mockEmployeeProvider,
      mockEmailService
    );
  });

  it("should send a birthday email if today is an employee's birthday", async () => {
    const today = new BirthDate("2025-03-16");
    const employee = new Employee(
      new Name("Doe", "John"),
      new BirthDate("1990-03-16"),
      new EmailAddress("john.doe@example.com")
    );

    mockEmployeeProvider.fetchEmployees.mockResolvedValue([employee]);

    await birthdayService.sendGreetings(today);

    expect(mockEmailService.send).toHaveBeenCalled();
  });

  it("should not send an email if no employees have a birthday today", async () => {
    const today = new BirthDate("2025-03-16");
    const employee = new Employee(
      new Name("Smith", "Alice"),
      new BirthDate("1990-05-21"),
      new EmailAddress("alice@example.com")
    );

    mockEmployeeProvider.fetchEmployees.mockResolvedValue([employee]);

    await birthdayService.sendGreetings(today);

    expect(mockEmailService.send).not.toHaveBeenCalled();
  });

  it("should handle an empty employee list without errors", async () => {
    const today = new BirthDate("2025-03-16");
    mockEmployeeProvider.fetchEmployees.mockResolvedValue([]);

    await birthdayService.sendGreetings(today);

    expect(mockEmailService.send).not.toHaveBeenCalled();
  });
});
