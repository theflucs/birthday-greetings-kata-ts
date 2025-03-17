export class EmailAddress {
  constructor(private readonly address: string) {}

  value(): string {
    return this.address;
  }

  isValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.address);
  }
}
