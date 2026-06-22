import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const TO = process.env.CONTACT_TO || 'sankalpsandeepsingh@gmail.com';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Build a transport. Uses Gmail SMTP when an App Password is configured,
// otherwise falls back to a free Ethereal test inbox so the flow is testable.
async function createTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (user && pass) {
    return {
      mode: 'gmail',
      from: user,
      transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      }),
    };
  }

  const testAccount = await nodemailer.createTestAccount();
  return {
    mode: 'ethereal',
    from: testAccount.user,
    transporter: nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass },
    }),
  };
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: 'Name, email, and message are required.' });
  }

  try {
    const { transporter, mode, from } = await createTransport();
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to: TO,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    });

    const preview =
      mode === 'ethereal' ? nodemailer.getTestMessageUrl(info) : null;
    if (preview) console.log('📨 Ethereal preview URL:', preview);

    res.json({ ok: true, mode, preview });
  } catch (err) {
    console.error('Email send failed:', err.message);
    res
      .status(500)
      .json({ ok: false, error: 'Could not send your message. Please try again.' });
  }
});

// In production, serve the built front-end from this same server.
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback for any non-API GET (Express 5 safe — middleware, not '*').
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  const configured = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
  console.log(`Mail server running on http://localhost:${PORT}`);
  console.log(
    configured
      ? `Sending via Gmail as ${process.env.GMAIL_USER}`
      : 'No Gmail credentials set — using Ethereal test inbox (see preview URLs in logs).',
  );
});
