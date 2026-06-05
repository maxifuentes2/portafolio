import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const createTransporter = () => {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) return null;
    return nodemailer.createTransport({
        host, port, secure: false,
        auth: { user, pass },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
    });
};

const sendEmail = async (to, subject, html, replyTo) => {
    const transporter = createTransporter();
    if (!transporter) {
        console.error("[email] SMTP no configurado");
        return { error: true, reason: "SMTP not configured" };
    }

    const mailOptions = {
        from: `"${replyTo ? replyTo.name : "Portafolio"}" <${process.env.SMTP_USER}>`,
        replyTo: replyTo?.email || process.env.SMTP_USER,
        to,
        subject: `[Portafolio] ${subject}`,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("[email] OK to:", to);
        return { success: true };
    } catch (err) {
        console.error("[email] Error:", err.message);
        return { error: true, reason: err.message };
    }
};

app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
@media only screen and (max-width:600px){
.wrap{padding:24px 12px!important}.inner{width:100%!important}.hd{padding:28px 24px!important}.hd h1{font-size:18px!important}.bd{padding:28px 24px!important}.lb{width:auto!important;display:block!important;padding:0 0 2px!important}.vl{padding:0 0 14px!important}.ft{padding:16px 24px!important}
}
@media only screen and (max-width:380px){
.wrap{padding:16px 8px!important}.hd{padding:24px 20px!important}.hd h1{font-size:16px!important}.bd{padding:24px 20px!important}.ft{padding:14px 20px!important}
}
</style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table class="wrap" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px">
<tr><td align="center">
<table class="inner" role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05)">
<tr><td class="hd" style="padding:32px 40px 20px;border-bottom:1px solid #f0f0f0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="left" style="width:40px;padding:0 12px 0 0"><div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#b91c1c,#e11d48)"></div></td>
<td align="left"><h1 style="margin:0;font-size:20px;font-weight:700;color:#2d2d2d;letter-spacing:-0.3px">Nuevo mensaje</h1><p style="margin:2px 0 0;font-size:13px;color:#999">Recibido desde tu portafolio</p></td>
</tr></table>
</td></tr>
<tr><td class="bd" style="padding:28px 40px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:0 0 18px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td class="lb" width="80" style="font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.3px;padding:8px 16px 8px 0;vertical-align:top">Nombre</td><td class="vl" style="font-size:14px;color:#2d2d2d;padding:8px 0;word-break:break-word">${name}</td></tr>
<tr><td class="lb" width="80" style="font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.3px;padding:8px 16px 8px 0;vertical-align:top">Email</td><td class="vl" style="font-size:14px;padding:8px 0;word-break:break-word"><a href="mailto:${email}" style="color:#b91c1c;text-decoration:none;font-weight:500">${email}</a></td></tr>
<tr><td class="lb" width="80" style="font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.3px;padding:8px 16px 8px 0;vertical-align:top">Asunto</td><td class="vl" style="font-size:14px;color:#2d2d2d;padding:8px 0;font-weight:600;word-break:break-word">${subject}</td></tr>
</table>
</td></tr>
<tr><td style="border-top:1px solid #f0f0f0;padding:20px 0 0">
<p style="margin:0 0 10px;font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.3px">Mensaje</p>
<p style="margin:0;font-size:14px;color:#6b6b6b;line-height:1.7;white-space:pre-wrap;word-break:break-word">${message}</p>
</td></tr>
</table>
</td></tr>
<tr><td class="ft" style="padding:16px 40px;border-top:1px solid #f0f0f0;text-align:center;background:#fafafa">
<p style="margin:0;font-size:12px;color:#bbb">Responder a <a href="mailto:${email}" style="color:#b91c1c;text-decoration:none">${email}</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    const result = await sendEmail(process.env.CONTACT_EMAIL, subject, html, { name, email });

    if (result.error) {
        return res.status(500).json({ error: "Error al enviar el mensaje. Intenta de nuevo." });
    }

    res.json({ success: true, message: "Mensaje enviado correctamente" });
});

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("[config] SMTP_HOST:", process.env.SMTP_HOST || "NOT SET");
    console.log("[config] SMTP_PORT:", process.env.SMTP_PORT || "NOT SET");
    console.log("[config] SMTP_USER:", process.env.SMTP_USER ? "SET" : "NOT SET");
    console.log("[config] SMTP_PASS:", process.env.SMTP_PASS ? "SET" : "NOT SET");
    console.log("[config] CONTACT_EMAIL:", process.env.CONTACT_EMAIL || "NOT SET");

    const t = createTransporter();
    if (t) {
        t.verify()
            .then(() => console.log("[config] SMTP connection verified"))
            .catch(err => console.error("[config] SMTP verify failed:", err.message));
    } else {
        console.error("[config] SMTP not configured — missing SMTP_USER or SMTP_PASS");
    }
});
