const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
exports.node=()=>{
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "aliinoccent786@gmail.com",
    pass: "mjngzcfeshpgltuf",
  },
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: 'aliinoccent786@gmail.com',
    to: "ar.attari@tekhqs.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
})();
}
