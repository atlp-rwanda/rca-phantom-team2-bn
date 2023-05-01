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


export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
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
        subject: "Password Reset Request",
        text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          localhost:4000/api/users/reset-password/${resetToken}\n\n
          This link is valid for 1 hour.\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("The error is ")
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}