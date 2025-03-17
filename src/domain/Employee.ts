import { BirthDate } from "./BirthDate";
import { EmailAddress } from "./EmailAddress";
import { Name } from "./Name";

export class Employee {
  constructor(
    private readonly name: Name,
    private readonly birthDate: BirthDate,
    private readonly email: EmailAddress
  ) {}

  getFullName(): string {
    return this.name.getFullName();
  }

  getFirstName(): string {
    return this.name.getFirstName();
  }

  getEmailAddress(): EmailAddress {
    return this.email;
  }

  hasBirthdayOn(date: BirthDate): boolean {
    return this.birthDate.isSameDay(date);
  }
}
