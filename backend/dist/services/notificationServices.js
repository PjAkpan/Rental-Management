"use strict";
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
exports.sendPaymentReminder = (tenantEmail, dueDate) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: tenantEmail,
        subject: 'Payment Reminder',
        text: `Dear tenant, your payment is due on ${dueDate}. Please make your payment on time to avoid penalties.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
};
