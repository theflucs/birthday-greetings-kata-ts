import fs from "fs/promises";
import path from "path";
import { main } from "../../index";

// set a dynamic test CSV file path
const TEST_CSV_PATH = path.resolve(__dirname, "../../test_employees.csv");

// today's date in the format YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];

afterEach(async () => {
  try {
    await fs.unlink(TEST_CSV_PATH);
  } catch (error) {
    console.warn("Dinamically generated test CSV file was already deleted or not found.");
  }
});

describe("Integration Test for main()", () => {
  it("should process birthdays and send emails when there is a match", async () => {
    await fs.writeFile(
      TEST_CSV_PATH,
      `last_name,first_name,date_of_birth,email\n` +
        `Doe,John,${today},john.doe@foobar.com\n` +
        `Ann,Mary,1975-09-11,mary.ann@foobar.com\n`
    );

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await main(TEST_CSV_PATH);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Mock Email Sent")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("To: john.doe@foobar.com")
    );

    consoleSpy.mockRestore();
  });

  it("should run but not send emails when no birthdays match", async () => {
    await fs.writeFile(
      TEST_CSV_PATH,
      `last_name,first_name,date_of_birth,email\n` +
        `Doe,John,1990-01-01,john.doe@foobar.com\n` +
        `Ann,Mary,1975-09-11,mary.ann@foobar.com\n`
    );

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await main(TEST_CSV_PATH);

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("Mock Email Sent")
    );

    consoleSpy.mockRestore();
  });
});
