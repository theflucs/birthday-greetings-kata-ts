import { EmailAddress } from "../../domain/EmailAddress";

describe("EmailAddress", () => {
  it("should store and return the correct email address", () => {
    const email = new EmailAddress("john.doe@example.com");
    expect(email.value()).toBe("john.doe@example.com");
  });

  it("should allow valid email formats", () => {
    const validEmails = [
      "user@example.com",
      "test.email@domain.co",
      "first.last@sub.domain.net",
    ];

    validEmails.forEach((email) => {
      const emailObj = new EmailAddress(email);
      expect(emailObj.value()).toBe(email);
    });
  });

  it("should return the email even if it's invalid", () => {
    const invalidEmail = "invalid-email";
    const email = new EmailAddress(invalidEmail);
    expect(email.value()).toBe(invalidEmail); // no validation means it still returns the input
  });
});
