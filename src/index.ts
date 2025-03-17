import fs from "fs/promises";
import { CsvEmployeeProvider } from "./providers/CsvEmployeeProvider";
import { BirthdayService } from "./services/BirthdayService";
import { ConsoleEmailService } from "./services/ConsoleEmailService";
import { BirthDate } from "./domain/BirthDate";

export async function main(csvPath: string = "data/employees.csv") {
  try {
    const fileReader = async (path: string) => await fs.readFile(path, "utf-8");
    const employeeProvider = new CsvEmployeeProvider(fileReader, csvPath);

    const emailService = new ConsoleEmailService();
    const birthdayService = new BirthdayService(employeeProvider, emailService);

    const today = new BirthDate(new Date().toISOString().split("T")[0]);

    await birthdayService.sendGreetings(today);

    console.log("Birthday greetings process completed!");
  } catch (error) {
    console.error("Error in sending birthday greetings:", error);
  }
}

if (require.main === module) {
  main(); // only run if executed directly
}
