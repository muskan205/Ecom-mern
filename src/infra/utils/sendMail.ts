const nodemailer = require('nodemailer');
export class MailService {
    transporter: any;
    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "muskantomar48@gmail.com", // Your email address
          pass: "uptm zrne yatg slsw"
        },
      });
    }
  
    async sendMail(to: any, subject: any, text: any) {
      const mailOptions = {
        to,
        from:"muskantomar48@gmail.com",
        subject,
        text,
      };
  
      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
      }
    }
  }
// module.exports=new MailService()