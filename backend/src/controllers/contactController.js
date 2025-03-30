import { createContact } from "../services/contactService.js";

const submitContactForm = async (req, res) => {
    try {
        const { fname, lname, fullname, email, phone, message, option1, option2, domain } = req.body;
        const createdBy = req.user.id; // Extract user ID from JWT (set by authMiddleware)

        const contactData = { fname, lname, fullname, email, phone, message, option1, option2, domain, createdBy };
        const newContact = await createContact(contactData);

        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { submitContactForm };
