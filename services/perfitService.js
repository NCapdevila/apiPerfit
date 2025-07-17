const axios = require('axios');

const PERFIT_API_KEY = process.env.PERFIT_API_KEY;
const ACCOUNT = process.env.PERFIT_ACCOUNT;

async function enviarContacto({ lead, vehicle, customer, type, listId, quotationNumber }) {
  if (!lead || !lead.email || !lead.firstName || !lead.lastName) {
    throw new Error('Faltan datos obligatorios en lead');
  }
  if (!listId || isNaN(listId)) {
    throw new Error('Falta o es inválido el listId');
  }

  // Construir customFields con IDs correctos y filtrando vacíos
  const customFields = [
    { id: 14, value: customer },
    { id: 19, value: type },
    { id: 20, value: lead.Province },
    { id: 21, value: lead.Locality },
    { id: 22, value: lead.phoneNumber },
    { id: 23, value: lead.firstName },
    { id: 24, value: lead.lastName },
    { id: 25, value: lead.age },
    { id: 26, value: vehicle?.brand },
    { id: 27, value: vehicle?.year },
    { id: 28, value: vehicle?.model },
    { id: 29, value: vehicle?.version },
    { id: 30, value: vehicle?.infoAutoCode },
    { id: 34, value: quotationNumber }
  ].filter(field => field.value !== undefined && field.value !== null && field.value !== '');

  const contactData = {
    email: lead.email,
    firstName: lead.firstName,
    lastName: lead.lastName,
    customFields
  };

  const url = `https://api.myperfit.com/v2/${ACCOUNT}/lists/${listId}/contacts`;

  const response = await axios.post(url, contactData, {
    headers: {
      Authorization: `Bearer ${PERFIT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.data;
}

module.exports = { enviarContacto };
