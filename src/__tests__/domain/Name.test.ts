import { Name } from "../../domain/Name";

describe("Name", () => {
  it("should return cleaned first and last name - no extra spaces", () => {
    const name = new Name("  Doe  ", "  John  ");
    expect(name.getFirstName()).toBe("John");
  });

  it("should return full name as lastName firstName", () => {
    const name = new Name("Doe", "John");
    expect(name.getFullName()).toBe("Doe John");
  });

  describe("getFirstName", () => {
    it("should return first name", () => {
      const name = new Name("Doe", "John");
      expect(name.getFirstName()).toBe("John");
    });
  });
});
