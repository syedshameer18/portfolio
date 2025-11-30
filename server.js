const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from /public
app.use(express.static(__dirname));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-message", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,   // using environment variable
            pass: process.env.EMAIL_PASS    // using environment variable
        }
    });

    const mailOptions = {
        from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Portfolio Message - ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Message Sent Successfully!" });
    } catch (err) {
        console.error(err);
        res.json({ message: "Failed to send message" });
    }
});

// Required for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
