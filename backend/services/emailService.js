const nodemailer = require('nodemailer');

 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,   
  },
});

 
const sendEmail = async (email, name, reservationDate, time, person, message) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Table Reservation Confirmation',
      html: `
        <h3>Reservation Confirmation</h3>
        <p>Dear ${name},</p>
        <p>Thank you for booking a table with us. Here are your reservation details:</p>
        <ul>
          <li><b>Date:</b> ${reservationDate}</li>
          <li><b>Time:</b> ${time}</li>
          <li><b>Persons:</b> ${person}</li>
          <li><b>Message:</b> ${message}</li>
        </ul>
        <p>We look forward to serving you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reservation confirmation email sent to ${email}`);
  } catch (err) {
    console.error('Error sending reservation email:', err);
    throw new Error('Error sending reservation email');
  }
};

 
const sendWelcomeEmail = (toEmail) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: toEmail,
    subject: 'Thank You for Registering!',
    text: 'Thank you for registering at our restaurant. We are excited to have you with us!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending welcome email:', error);
    } else {
      console.log('Welcome email sent: ' + info.response);
    }
  });
};

 
const sendEmailToMultipleRecipients = async (emails, subject, message) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: emails.join(', '),   
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to all recipients');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;   
  }
};

 
const sendSubscriptionConfirmationEmail = async (toEmail) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: toEmail,
    subject: 'Thank You for Subscribing!',
    text: `Dear Subscriber,

  Thank you for subscribing to our service! We’re excited to have you onboard.

  You will now receive exclusive updates, deals, and offers directly to your inbox. Stay tuned for the latest news!

  Best regards,
  The Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Subscription confirmation email sent');
  } catch (error) {
    console.error('Error sending subscription confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendEmailToMultipleRecipients,
  sendSubscriptionConfirmationEmail,
};
