import {Injectable} from "@nestjs/common";
import nodemailer from "nodemailer";
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

@Injectable()
export class MailerService {
    private user = "no-reply@tishoptfg.com";
    private pass = process.env.EMAIL_PASS;

    constructor() {
        //do nothing
    }

    readHTMLFile(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
               callback(err); 
               throw err;
                
            }
            else {
                callback(null, html);
            }
        });
    };    

    public async sendCode(email: string, code: string) {
        let transporter = nodemailer.createTransport({
            host: "send.one.com",
            port: 465,
            secure: false,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        });

        let thisOut = this

        this.readHTMLFile(path.resolve(__dirname, "./templates/Login/login.html"), function (err, html) {
 
            if(err){
                console.log(err)
            }else{
                var template = handlebars.compile(html);
                var replacements = {
                    code: code
                };
                var htmlToSend = template(replacements);
                const mailOptions = {
                    from: thisOut.user,
                    to: email,
                    subject: "[TI-SHOP] Login Code",
                    html: htmlToSend,
                    attachments: [{
                        filename: 'Logo-TISHOP',
                        path: path.resolve(__dirname,'./templates/Login/Logo-TISHOP.png'),
                        cid: 'Logo-TISHOP'
                    }]
                };
        
                transporter.sendMail(mailOptions, function(error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        })
    }
}
