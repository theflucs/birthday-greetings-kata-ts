import { BirthDate } from "./BirthDate";
import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";

export class Employee {
  constructor(
    private readonly fullName: FullName,
    private readonly birthDate: BirthDate,
    private readonly email: EmailAddress
  ) {}

  getFirstName(): string {
    return this.fullName.getFirstName();
  }

  getEmailAddress(): EmailAddress {
    return this.email;
  }

  hasBirthdayOn(date: BirthDate): boolean {
    return this.birthDate.isSameDay(date);
  }
}
