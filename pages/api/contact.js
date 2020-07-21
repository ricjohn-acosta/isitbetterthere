import nodemailer from "nodemailer";

export default async function contact(req, res) {
  if (req.method === "POST") {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: "isitbetterthere@gmail.com",
        // pass: "wtf!5dudE",
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Enquiry" <isitbetterthere@gmail.com>', // sender address
      to: "ricjohn.genoguin@gmail.com", // list of receivers
      subject: `${req.body.name} - ${req.body.email}`, // Subject line
      text: req.body.message, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });

    res.status(200).end();
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
