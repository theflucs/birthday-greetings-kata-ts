import { Birthdate } from "./Birthdate";

export class Employee {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly birthDate: Birthdate,
    private readonly email: string
  ) {}

  getName(): string {
    return this.firstName;
  }

  getEmailAddress(): string {
    return this.email;
  }

  getBirthdate(): Birthdate {
    return this.birthDate;
  }
}
