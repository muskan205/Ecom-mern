"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer = require('nodemailer');
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "muskantomar48@gmail.com",
                pass: "uptm zrne yatg slsw"
            },
        });
    }
    sendMail(to, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                to,
                from: "muskantomar48@gmail.com",
                subject,
                text,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send email');
            }
        });
    }
}
exports.MailService = MailService;
// module.exports=new MailService()
