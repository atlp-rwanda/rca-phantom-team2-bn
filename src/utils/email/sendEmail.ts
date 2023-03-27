import nodemailer from "nodemailer"
import { Response } from "express"

export const sendEmail = async (email: string, password: string, res: Response) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
  
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: res.__("login_credentials_message"),
        text: `${res.__("your_login_credentials_message")}.\nEmail: ${email}\nPassword: ${password}`,
    }
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}