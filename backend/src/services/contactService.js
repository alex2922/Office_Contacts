import { database } from "../database/config.js";

const createContact = async (contactData) => {
    const {
        fname,
        lname,
        fullname,
        email,
        phone,
        message,
        option1,
        option2,
        domain,
        createdBy,
    } = contactData;

    // Ensure required fields are provided
    if (!email || !message || !domain || !createdBy) {
        throw new Error("Email, message, domain, and createdBy are required.");
    }

    const query = `
        INSERT INTO contacts (fname, lname, fullname, email, phone, message, option1, option2, domain, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, email, message, domain, created_by, created_at
    `;

    const values = [
        fname || null,
        lname || null,
        fullname || null,
        email,
        phone || null,
        message,
        option1 || null,
        option2 || null,
        domain,
        createdBy,
    ];

    const result = await database.query(query, values);
    return result.rows[0];
};

export { createContact };
