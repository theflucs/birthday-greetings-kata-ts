import { CsvEmployeeProvider } from "../../providers/CsvEmployeeProvider";
import { parseCsvToEmployees } from "../../utils";

jest.mock("../../utils", () => ({
  parseCsvToEmployees: jest.fn(),
}));

describe("CsvEmployeeProvider", () => {
  let mockFileReader: jest.Mock;

  beforeEach(() => {
    mockFileReader = jest.fn();
  });

  it("should read the file using the injected file reader and delegate parsing", async () => {
    mockFileReader.mockResolvedValue("mocked csv content");

    const mockEmployees = [
      { getName: () => "John" },
      { getName: () => "Mary" },
    ];
    (parseCsvToEmployees as jest.Mock).mockReturnValue(mockEmployees);

    const provider = new CsvEmployeeProvider(mockFileReader, "employees.csv");
    const employees = await provider.fetchEmployees();

    expect(mockFileReader).toHaveBeenCalledWith("employees.csv");
    expect(parseCsvToEmployees).toHaveBeenCalledWith("mocked csv content");
    expect(employees).toEqual(mockEmployees);
  });

  it("should return an empty array if the CSV file is empty", async () => {
    mockFileReader.mockResolvedValue(
      "last_name, first_name, date_of_birth, email"
    );
    (parseCsvToEmployees as jest.Mock).mockReturnValue([]);

    const provider = new CsvEmployeeProvider(mockFileReader, "employees.csv");
    const employees = await provider.fetchEmployees();

    expect(employees).toHaveLength(0);
  });
});
