const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailMap = {
  cuponstar: "micaela.d@cebrokers.com.ar",
  appa: "micaela.d@cebrokers.com.ar",
  useguro: "micaela.d@cebrokers.com.ar",
  maslow: "gaston@cebrokers.com.ar",
  motordil: "gaston@cebrokers.com.ar",
  prueba: "ramiro.c@cebrokers.com.ar",
  
};

async function enviarEmail({
  lead,
  vehicle = {},
  quotationNumber,
  customer,
  type,
}) {
  const {
    firstName,
    lastName,
    email,
    age,
    postalCode,
    Province,
    Locality,
    phoneNumber,
  } = lead;
  const { brand, model, year, version, infoAutoCode } = vehicle;

  const destino = emailMap[customer];

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
      <h2 style="color: #333;">🧍‍♂️/🧍‍♀️ Datos personales</h2>
      <p>
        <b>Nombre:</b> ${firstName}<br>
        <b>Apellido:</b> ${lastName}<br>
        <b>Edad:</b> ${age}<br>
        <b>Email:</b> ${email}<br>
        <b>Celular:</b> ${phoneNumber}<br>
        <b>Provincia:</b> ${Province}<br>
        <b>Localidad:</b> ${Locality}<br>
        <b>Código postal:</b> ${postalCode}
      </p>

      <hr style="border: 1px solid #ccc; margin: 20px 0;">

      <h2 style="color: #333;">Campaña: ${customer}</h2>
      <p>
        <b>Riesgo:</b> ${type}<br>
        ${
          brand || model || year || version || infoAutoCode
            ? `
        <h2>🚗 Datos del vehículo</h2>
        <b>Marca:</b> ${brand || "-"}<br>
        <b>Modelo:</b> ${model || "-"}<br>
        <b>Año:</b> ${year || "-"}<br>
        <b>Versión:</b> ${version || "-"}<br>
        <b>Código Info:</b> ${infoAutoCode || "-"}<br><br>
        `
            : ""
        }
        <b>Cotización:</b> ${quotationNumber || "-"}
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"Cotizador" <${process.env.EMAIL_USER}>`,
    to: destino,
    subject: `[${customer}]-[${type}]-Nuevo lead`,
    html,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarEmail };

