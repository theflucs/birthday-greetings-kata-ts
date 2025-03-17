import { FullName } from "../FullName";

describe("FullName - getFirstName", () => {
  it("should return first name", () => {
    const name = new FullName("John", "Doe");
    expect(name.getFirstName()).toBe("John");
  });

  it("should return clean first names - no extra spaces", () => {
    const name = new FullName("  John  ", "Doe");
    expect(name.getFirstName()).toBe("John");
  });
});
