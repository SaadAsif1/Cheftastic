const nodemailer = require('nodemailer');
const { contactValidation } = require('../validators/contact');

exports.contact = (req, res) => {
  // Validate Incoming body request
  const { error, value } = contactValidation(req.body);

  // If error with request
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Send Email to User So they can validate there account trought link
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Reminders <${process.env.EMAIL_FROM}>`,
    to: 'saadasif2121@gmail.com',
    subject: 'Reminders Website',
    html: `
     <div>
       <h1>This is a message from your Reminders Website</h1>
       <p><b>My Name Is -</b> ${value.name}</p>
       <p><b>My Email Is -</b> ${value.email}</p>
       <p><b>My Message Is -</b> ${value.message}</p>
     </div>
     `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    // If email is sent succesfully
    if (info)
      return res.json({
        message: `Your message has been sent!`,
      });

    // If email unsuccsfully sent
    if (error) return res.json({ error });
  });
};
