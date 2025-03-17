export class Name {
  private readonly firstName: string;
  private readonly lastName: string;

  constructor(lastName: string, firstName: string) {
    this.lastName = this.clean(lastName);
    this.firstName = this.clean(firstName);
  }

  private clean(name: string): string {
    return name.trim();
  }

  getFullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  getFirstName(): string {
    return this.firstName;
  }
}
