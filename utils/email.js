const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "khatriaamir402@gmail.com",
    pass: "fglp hvhd vrkn kyfz",
  },
});

const sendMail = async ({ to, subject }) => {
  try {
    const info = await transporter.sendMail({
      to,
      subject,
      from: "khatriaamir402@gmail.com",
      text: "this is a testing email. so dont get worry",
    });
  } catch (error) {
    console.log(error, "<><><>");
  }
};

sendMail({ to: "khatriaemrin7s@gmail.com", subject: "Testing email" });
