# Birthday Greetings Kata

## About

This repository implements the **Birthday Greetings Kata** using **TypeScript** and **Jest**, applying **hexagonal architecture** and [**object calisthenics**](https://bolcom.github.io/student-dojo/legacy-code/DevelopersAnonymous-ObjectCalisthenics.pdf) to build a **flexible and testable** system. The design ensures that **business logic remains independent of infrastructure**, making it easy to adapt and extend.

By following **dependency injection**, the system allows seamless replacements, such as switching from a **CSV file to a database** or using an **API-based email service**. While not strictly following **TDD**, tests guided development, ensuring correctness, maintainability, and safe refactoring.

## References

- [Matteo Vaccari's Blog Post](https://matteo.vaccari.name/blog/archives/154)

## How This Kata Aligns with the Requirements

| **Requirement**                                                       | **Implementation**                                                                                                                                                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Load employee records from a flat file**                            | `CsvEmployeeProvider` reads employee data from a CSV file, ensuring flexibility for potential future sources like databases or APIs.                                                                         |
| **Send a greeting email to employees whose birthday is today**        | `BirthdayService` retrieves employees, filters based on today's date, and sends greetings.                                                                                                                   |
| **Ensure testability without sending real emails**                    | `ConsoleEmailService` mocks email sending for testing, ensuring that business logic can be verified without external dependencies.                                                                           |
| **Support flexible data sources (e.g., future database integration)** | `EmployeeProvider` is an interface, making it easy to introduce alternative data storage without modifying core logic.                                                                                       |
| **Allow switching the email service**                                 | `EmailService` is abstracted, so different implementations can replace the console-based approach.                                                                                                           |
| **Strict separation of business logic and infrastructure**            | The **domain layer** (e.g., `BirthDate`, `Employee`) contains pure business logic, while infrastructure (file handling, email sending) is handled separately.                                                |
| **Tests should be clearly separated into unit and integration tests** | Separate commands for tests: `pnpm test:unit` runs fast unit tests, while `pnpm test:integration` ensures components work together correctly.                                                                |
| **Special rule for people born on Feb 29**                            | `BirthDate` uses `LeapYear` logic to check if the current year is a leap year. In non-leap years, birthdays are celebrated on **Feb 28**, while in leap years, greetings are sent on **Feb 29** as expected. |

## Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- A package manager:
  - [pnpm](https://pnpm.io/) (recommended)
  - [yarn](https://yarnpkg.com/)
  - [npm](https://www.npmjs.com/)

### Installation

```
git clone https://github.com/theflucs/birthday-greetings-kata-ts.git
cd birthday-greetings-kata
pnpm install
```

or use your preferred package manager

## Run the application

```
pnpm build
pnpm start
```

## Run tests

```
pnpm test

pnpm test:unit

pnpm test:integration
```
