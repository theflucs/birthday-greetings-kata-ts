import { Employee } from "../domain/Employee";

export interface EmployeeProvider {
  fetchEmployees(): Promise<Employee[]>;
}
