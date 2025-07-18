
Documentación para consumir API Perfit

Descripción
-----------
API que recibe datos de leads para enviarlos a Perfit y mandar un email al responsable de la campaña.

Endpoint
--------
POST 
https://api-perfit.cebrokers.com.ar/enviar-a-perfit

Headers
-------
Content-Type: application/json

Body (JSON)
-----------
{
  "lead": {
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@test.com",
    "age": 30,
    "postalCode": "1405",
    "Province": "CABA",
    "Locality": "Villa del Parque",
    "phoneNumber": "1130001122"
  },
  "vehicle": {
    "brand": "Toyota",
    "model": "Corolla",
    "year": "2023",
    "version": "XEI Pack",
    "infoAutoCode": "123456"
  },
  "quotationNumber": "ABC123456789",
  "listId": 126,
  "customer": "prueba",
  "type": "Auto"
}

Campos clave
------------
Campo           | Descripción                                     | Obligatorio?
----------------|-----------------------------------------------  |-------------
lead            | Objeto con datos personales del lead            | Sí
lead.email      | Email válido del lead                           | Sí
listId          | ID numérico de lista en Perfit                  | Sí
customer        | Nombre de campaña (para definir mail destino)   | Sí
type            | Tipo de riesgo (Auto, Hogar, etc.)              | Sí
vehicle         | Datos del vehículo (puede estar vacío)          | No
quotationNumber | Número de cotización (puede estar vacío)        | No

Campo `type` (Tipo de riesgo)
-----------------------------

El campo `"type"` indica el tipo de riesgo o campaña para la cual se está enviando el lead.  
Puede tomar valores como:

- "Auto"
- "Hogar"
- "Moto"
- "Vida"
- "Comercio"
- Otros valores que se definan en la configuración interna.

Este campo afecta principalmente:

- El correo electrónico al que se enviará la notificación.
- La segmentación dentro de Perfit.

Ejemplo en el body:

{
  ...
  "type": "Auto",  // Puede ser también "Hogar", "Moto", etc.
  ...
}

Respuesta exitosa
-----------------
{
  "message": "Contacto enviado a Perfit ✅ y correo enviado 📧",
  "data": { ... }
}

Errores comunes
---------------
- 400: Faltan datos obligatorios (email, listId, etc.)
- 500: Error interno al enviar datos o email

---

