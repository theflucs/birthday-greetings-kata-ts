import { Birthdate } from "./Birthdate";
import { EmailAddress } from "./EmailAddress";

export class Employee {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly birthDate: Birthdate,
    private readonly email: EmailAddress
  ) {}

  getName(): string {
    return this.firstName;
  }

  getEmailAddress(): EmailAddress {
    return this.email;
  }

  getBirthdate(): Birthdate {
    return this.birthDate;
  }
}
