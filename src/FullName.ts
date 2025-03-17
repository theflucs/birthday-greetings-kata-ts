export class FullName {
  private readonly firstName: string;
  private readonly lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = this.clean(firstName);
    this.lastName = this.clean(lastName);
  }

  private clean(name: string): string {
    return name.trim();
  }

  getFirstName(): string {
    return this.firstName;
  }
}
