import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.CONTACT_EMAIL,
        subject: `[Portafolio] ${subject}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
@media only screen and (max-width:600px){
.body{padding:24px 12px!important}.inner{width:100%!important;max-width:100%!important}.header{padding:24px 20px!important}.header h1{font-size:18px!important}.content{padding:24px 20px!important}.label{width:80px!important;font-size:12px!important}.value{font-size:13px!important}.footer{padding:16px 20px!important}
}
@media only screen and (max-width:380px){
.body{padding:16px 8px!important}.header{padding:20px 16px!important}.header h1{font-size:16px!important}.content{padding:20px 16px!important}
}
</style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table class="body" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px">
<tr><td align="center">
<table class="inner" role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
<tr><td class="header" style="background:linear-gradient(135deg,#b91c1c,#e11d48);padding:32px 40px 24px">
<h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">Nuevo mensaje de contacto</h1>
<p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px">Recibido desde tu portafolio</p>
</td></tr>
<tr><td class="content" style="padding:32px 40px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:0 0 20px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td class="label" width="80" style="font-size:13px;font-weight:600;color:#888;padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">Nombre</td><td class="value" style="font-size:14px;color:#333;padding:6px 0;word-break:break-word">${name}</td></tr>
<tr><td class="label" width="80" style="font-size:13px;font-weight:600;color:#888;padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">Email</td><td class="value" style="font-size:14px;padding:6px 0;word-break:break-word"><a href="mailto:${email}" style="color:#b91c1c;text-decoration:none">${email}</a></td></tr>
<tr><td class="label" width="80" style="font-size:13px;font-weight:600;color:#888;padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">Asunto</td><td class="value" style="font-size:14px;color:#333;padding:6px 0;font-weight:600;word-break:break-word">${subject}</td></tr>
</table>
</td></tr>
<tr><td style="border-top:1px solid #eee;padding:20px 0 0">
<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px">Mensaje</p>
<p style="margin:0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;word-break:break-word">${message}</p>
</td></tr>
</table>
</td></tr>
<tr><td class="footer" style="background:#fafafa;padding:20px 40px;border-top:1px solid #eee">
<p style="margin:0;font-size:12px;color:#aaa;text-align:center">Responder a <a href="mailto:${email}" style="color:#b91c1c;text-decoration:none">${email}</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`,
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
