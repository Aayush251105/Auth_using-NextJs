import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

// sending verification mail

export const sendEmail = async ({email, emailType, userId}) => {
    try{
        // create a hashed token based on userID
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        // checking if the email should be sent for password reset or varification
        // updating the db
        if (emailType === "VERIFY") {
            // @ts-expect-error -no
            await User.findByIdAndUpdate(userId,
                {verifyToken : hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            )
        } 
        else if(emailType === "RESET"){
            // @ts-expect-error -no
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}
            )
        }

        // sending email using nodemailer
        // copy paste from mail trap
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        });


        const mailOptions = {
            from: "aayushgupta054@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemial?token=${hashedToken}</p>`

        }

        const mailResponse  = await transport.sendMail(mailOptions);
        return mailResponse

    } catch(err) {
        throw new Error(err.message)
    }
}