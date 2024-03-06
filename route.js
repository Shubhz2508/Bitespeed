const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Default superuser
    host: 'localhost',
    database: 'postgres', // You can use an existing database or create a new one
    password: "Shubh@2508", // Password for the default superuser (leave empty if not set)
    port: 5432, // Default PostgreSQL port is 5432
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const router = express.Router();

router.post('/identify', async (req, res) => {
    try {
        // Extract email and phoneNumber from request body
        const { email, phoneNumber } = req.body;

        // Check if email and phoneNumber are provided in the request body
        if (!email || !phoneNumber) {
            return res.status(400).json({ error: 'Email and phoneNumber are required' });
        }

        // Query the database based on email and phoneNumber
        const query = {
            text: 'SELECT * FROM contact WHERE email = $1 OR phoneNumber = $2',
            values: [email, phoneNumber],
        };
        const { rows } = await pool.query(query);

        let response = {};

        if (rows.length > 0) {
            // If a contact is found in the database
            const primaryContact = rows.find(contact => contact.linkPrecedence === 'primary');
            const secondaryContacts = rows.filter(contact => contact.linkPrecedence === 'secondary');

            response = {
                primaryContactId: primaryContact.id,
                emails: rows.map(contact => contact.email),
                phoneNumbers: rows.map(contact => contact.phoneNumber),
                secondaryContactIds: secondaryContacts.map(contact => contact.id)
            };
        } else {
            // If no contact is found in the database, create a new contact record
            const insertQuery = {
                text: 'INSERT INTO contact (email, phoneNumber, linkPrecedence) VALUES ($1, $2, $3) RETURNING id',
                values: [email, phoneNumber, 'primary'], // Set linkPrecedence as "primary" for the first contact
            };

            const { rows: [newContact] } = await pool.query(insertQuery);

            response = {
                primaryContactId: newContact.id,
                emails: [email],
                phoneNumbers: [phoneNumber],
                secondaryContactIds: []
            };
        }

        // Send a JSON response with the constructed response object
        res.json({ contact: response });
    } catch (error) {
        console.error('Error handling /identify endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
