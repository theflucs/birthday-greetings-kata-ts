import { Employee } from "./Employee";

export interface EmployeeProvider {
  fetchEmployees(): Promise<Employee[]>;
}
