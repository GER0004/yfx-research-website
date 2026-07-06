import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendNewRequestNotification({ fullName, email, ip, date }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] SMTP not configured — skipping notification");
    return;
  }

  const to = process.env.EMAIL_TO || "yfxresearch@gmail.com";
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "New Early Access Request",
    text: [
      "New Early Access Request",
      "",
      `Name:\n${fullName}`,
      "",
      `Email:\n${email}`,
      "",
      `Date:\n${formattedDate}`,
      "",
      `IP:\n${ip || "unknown"}`,
    ].join("\n"),
  });
}
