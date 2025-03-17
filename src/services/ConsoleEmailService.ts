import { EmailAddress } from "../domain/EmailAddress";
import { EmailService } from "./EmailService";

export class ConsoleEmailService implements EmailService {
  async send(to: EmailAddress, subject: string, body: string): Promise<void> {
    console.log(`Mock Email Sent
      To: ${to.value()}
      Subject: ${subject}
      Body: ${body}
    `);
  }
}
