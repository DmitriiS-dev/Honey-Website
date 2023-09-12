import nodemailer from "nodemailer";

const email = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;

//nodemailer
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: email,
        pass: password
    }
})