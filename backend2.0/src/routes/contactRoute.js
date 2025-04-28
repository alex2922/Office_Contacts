import {Router} from "express";
import { AddContact, getAllContacts, editAllContacts, deleteContact } from "../controllers/contactController.js";

const contactRouter = Router();

// Create a new contact
contactRouter.post("/add-contact", AddContact);

// Get all contacts for the authenticated user
contactRouter.get("/get-contacts", getAllContacts);

// Edit a contact
contactRouter.put("/edit-contact", editAllContacts);

// Delete a contact
contactRouter.delete("/delete-contact/:id", deleteContact);

export default contactRouter;