const express = require('express');
const router = express.Router();

const { enviarContacto } = require('../services/perfitService.js');
const { enviarEmail } = require('../services/emailService.js');

router.post('/', async (req, res) => {
  const { lead, listId, quotationNumber, customer, type, vehicle } = req.body;

  if (!lead || !lead.email) {
    return res.status(400).json({ error: 'Falta el email del lead' });
  }
  if (!listId || isNaN(listId)) {
    return res.status(400).json({ error: 'Falta o es inválido el listId' });
  }

  try {
    
    const response = await enviarContacto({ lead, vehicle, customer, type, listId, quotationNumber });

    await enviarEmail({ lead, vehicle, quotationNumber, customer, type });

    res.status(200).json({
      message: 'Contacto enviado a Perfit ✅ y correo enviado 📧',
      data: response
    });
  } catch (err) {
    console.error('Error general:', err.message || err);
    res.status(500).json({ error: 'Error al enviar a Perfit o al enviar el email ❌' });
  }
});

module.exports= router;