import {Injectable} from "@nestjs/common";
import nodemailer from "nodemailer";

@Injectable()
export class MailerService {
    private user = "tishoptfg@gmail.com";
    private pass = process.env.EMAIL_PASS;

    constructor() {
        //do nothing
    }

    public async sendCode(email: string, code: string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        });

        const mailOptions = {
            from: this.user,
            to: email,
            subject: "Code",
            text: `Code to TI-SHOP: ${code}`,
        };

        transporter.sendMail(mailOptions, function(error) {
            if (error) {
                console.log(error);
            }
        });
    }
}
