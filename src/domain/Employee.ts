import { Birthdate } from "./Birthdate";
import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";

export class Employee {
  constructor(
    private readonly fullName: FullName,
    private readonly birthDate: Birthdate,
    private readonly email: EmailAddress
  ) {}

  getFirstName(): string {
    return this.fullName.getFirstName();
  }

  getEmailAddress(): EmailAddress {
    return this.email;
  }

  getBirthdate(): Birthdate {
    return this.birthDate;
  }
}
