import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Generate a secure token for the password reset
export const generateResetToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Send the password reset email
export const sendResetEmail = async (email: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Instructions',
    text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending reset email');
  }
};

