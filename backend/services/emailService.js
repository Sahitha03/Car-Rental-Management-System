const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent) => {  // ✅ Use htmlContent here
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alurisaisahitha@gmail.com", // ✅ Use your email
        pass: "tvelsgiixkkwskvo", // ✅ Use your app password (not actual password)
      },
    });

    const mailOptions = {
      from: "alurisaisahitha@gmail.com", // ✅ Use your email here directly
      to,
      subject,
      html: htmlContent, // ✅ Pass the correct htmlContent variable
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("🚨 Error sending email:", error);
  }
};

module.exports = sendEmail;
