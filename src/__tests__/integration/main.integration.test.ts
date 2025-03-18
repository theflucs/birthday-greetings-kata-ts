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
    console.warn(
      "Dinamically generated test CSV file was already deleted or not found."
    );
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

  it("should send birthday emails on Feb 28 for Feb 29 birthdays in a non-leap year", async () => {
    await fs.writeFile(
      TEST_CSV_PATH,
      `last_name,first_name,date_of_birth,email\n` +
        `Leap,Year,2000-02-29,leap.year@foobar.com\n`
    );

    const nonLeapYearFeb28Timestamp = new Date("2025-02-28T00:00:00.000Z");

    jest
      .spyOn(global, "Date")
      .mockImplementation(() => nonLeapYearFeb28Timestamp);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await main(TEST_CSV_PATH);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Mock Email Sent")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("To: leap.year@foobar.com")
    );

    consoleSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it("should send birthday emails on Feb 29 for Feb 29 birthdays in a leap year", async () => {
    await fs.writeFile(
      TEST_CSV_PATH,
      `last_name,first_name,date_of_birth,email\n` +
        `Leap,Year,2000-02-29,leap.year@foobar.com\n`
    );

    const leapYearFeb28Timestamp = new Date("2024-02-29T00:00:00.000Z");

    jest.spyOn(global, "Date").mockImplementation(() => leapYearFeb28Timestamp);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await main(TEST_CSV_PATH);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Mock Email Sent")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("To: leap.year@foobar.com")
    );

    consoleSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it("should NOT send birthday emails on Feb 28 for Feb 29 birthdays in a leap year", async () => {
    await fs.writeFile(
      TEST_CSV_PATH,
      `last_name,first_name,date_of_birth,email\n` +
        `Leap,Year,2000-02-29,leap.year@foobar.com\n`
    );

    const leapYearFeb28Timestamp = new Date(
      "2024-02-28T00:00:00.000Z"
    ).getTime();
    jest.spyOn(global.Date, "now").mockReturnValue(leapYearFeb28Timestamp);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await main(TEST_CSV_PATH);

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("Mock Email Sent")
    );
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("To: leap.year@foobar.com")
    );

    consoleSpy.mockRestore();
    jest.restoreAllMocks();
  });
});
