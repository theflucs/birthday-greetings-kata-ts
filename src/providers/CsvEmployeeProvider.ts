import { EmployeeProvider } from "./EmployeeProvider";
import { csvParser } from "../utils";

export class CsvEmployeeProvider implements EmployeeProvider {
  constructor(
    private readonly fileReader: (path: string) => Promise<string>,
    private readonly filePath: string
  ) {}

  async fetchEmployees() {
    const data = await this.fileReader(this.filePath);
    return csvParser(data);
  }
}
