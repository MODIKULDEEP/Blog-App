const nodemailer = require('nodemailer');

// Function to send email
async function sendMail(receiver, subject, content) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
    user: process.env.NODMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
  // Construct email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: receiver,
    subject: subject,
    text: content,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
