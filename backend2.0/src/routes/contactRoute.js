import {Router} from "express";
import { AddContact } from "../controllers/contactController.js";



const contactRouter = Router();

contactRouter.post("/add-contact", AddContact);

export default contactRouter;