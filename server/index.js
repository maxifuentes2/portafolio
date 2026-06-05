import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.CONTACT_EMAIL,
        subject: `Nuevo mensaje de ${name} desde el portafolio`,
        html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
        `,
    };

    try {
        transporter.sendMail(mailOptions)
            .then(info => console.log("[contact] Email sent:", info.messageId))
            .catch(err => console.error("[contact] Error email:", err));

        res.json({ success: true, message: "Mensaje enviado correctamente" });
    } catch (error) {
        console.error("Error al procesar mensaje:", error);
        res.status(500).json({ error: "Error al enviar el mensaje. Intenta de nuevo." });
    }
});

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("[config] SMTP_HOST:", process.env.SMTP_HOST || "NOT SET");
    console.log("[config] SMTP_PORT:", process.env.SMTP_PORT || "NOT SET");
    console.log("[config] SMTP_USER:", process.env.SMTP_USER ? "SET" : "NOT SET");
    console.log("[config] CONTACT_EMAIL:", process.env.CONTACT_EMAIL || "NOT SET");
});
