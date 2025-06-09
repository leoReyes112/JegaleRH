require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(express.json());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (!SENDGRID_API_KEY || !FROM_EMAIL) {
  console.error('Error: SENDGRID_API_KEY and FROM_EMAIL must be set in environment variables.');
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

app.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, and text or html' });
  }

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    // SendGrid puede devolver errores en error.response.body.errors
    if (error.response && error.response.body && error.response.body.errors) {
      return res.status(500).json({ error: 'Failed to send email', details: error.response.body.errors });
    }
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(4000, () => {
  console.log('Email server listening at http://localhost:4000');
});