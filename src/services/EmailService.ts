import { EmailAddress } from "../domain/EmailAddress";

export interface EmailService {
  send(to: EmailAddress, subject: string, body: string): Promise<void>;
}
