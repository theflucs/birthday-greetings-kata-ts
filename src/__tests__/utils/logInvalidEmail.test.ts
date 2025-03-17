import { BirthDate } from "../../domain/BirthDate";
import { EmailAddress } from "../../domain/EmailAddress";
import { Employee } from "../../domain/Employee";
import { Name } from "../../domain/Name";
import { logInvalidEmail } from "../../utils";

describe("logInvalidEmail", () => {
  it("should log a warning when an invalid email is detected", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    const employee = new Employee(
      new Name("Doe", "John"),
      new BirthDate("1990-03-17"),
      new EmailAddress("invalid-email")
    );

    logInvalidEmail(employee);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Skipping email for Doe John - Invalid email: invalid-email`
    );

    consoleWarnSpy.mockRestore();
  });
});
