import { prisma } from "../config/dbConfig.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD);

const validateApiKey = async (req, res) => {
    const apiKey = req.headers.authorization;
    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "API key is required in Authorization header",
        });
    }

    const selectedUser = await prisma.user.findFirst({
        where: {
            apiKey: apiKey,
        },
    });

    if (!selectedUser) {
        return res.status(401).json({
            success: false,
            message: "Invalid API key",
        });
    }

    return selectedUser;
};

const sendEmailNotification = async (userEmail, userName, contactData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        // Create HTML table for contact data
        const tableRows = Object.entries(contactData)
            .filter(([key, value]) => value !== "" && key !== "userId")
            .map(([key, value]) => `
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">${key}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${value}</td>
                </tr>
            `).join("");

        const htmlContent = `
            <h2>New Contact Form Submission</h2>
            <p>Hello ${userName},</p>
            <p>A new contact form has been submitted. Here are the details:</p>
            <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 8px; border: 1px solid #ddd;">Field</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "New Contact Form Submission",
            html: htmlContent,
        };

        console.log("Notification should be sent to:", userEmail, "with notification enabled:", selectedUser.emailNotification);
        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        console.error("Error sending email notification:", error);
    }
};

export const AddContact = async (req, res) => {
    try {
        const selectedUser = await validateApiKey(req, res);
        if (!selectedUser) return;

        const { name, firstName, lastName, email, message, phone, option1, option2, option3 } = req.body;

        const finalData = {
            name: selectedUser.nameInputStyle === "SINGLE" ? name : "",
            fristName: selectedUser.nameInputStyle === "SPLIT" ? firstName : "",
            lastName: selectedUser.nameInputStyle === "SPLIT" ? lastName : "",
            email: email || "",
            message: message || "",
            phone: selectedUser.phoneInput ? phone : "",
            option1: selectedUser.option1 ? option1 : "",
            option2: selectedUser.option2 ? option2 : "",
            option3: selectedUser.option3 ? option3 : "",
            userId: selectedUser.id,
            // mailSent: selectedUser.emailNotification ? true : false
        };

        const contact = await prisma.contacts.create({
            data: finalData,
        });

        // Send email notification if enabled
        console.log("Checking if notification should be sent...");
        if (selectedUser.emailNotification && selectedUser.email) {
            console.log("Sending email to:", selectedUser.email);
            await sendEmailNotification(
                selectedUser.email,
                selectedUser.userName,
                finalData
            );
            console.log("Email notification sent successfully to ", selectedUser.email);
        }

        return res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: {
                fristName: selectedUser.nameInputStyle === "SPLIT" ? firstName : "",
                lastName: selectedUser.nameInputStyle === "SPLIT" ? lastName : "",
                email: email || "",
                message: message || "",
                phone: selectedUser.phoneInput ? phone : "",
                option1: selectedUser.option1 ? option1 : "",
                option2: selectedUser.option2 ? option2 : "",
                option3: selectedUser.option3 ? option3 : "",
                userId: selectedUser.id
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const selectedUser = await validateApiKey(req, res);
        if (!selectedUser) return;

        const contacts = await prisma.contacts.findMany({
            where: {
                userId: selectedUser.id
            }
        });
        
        return res.status(200).json({
            success: true,
            message: "Contacts fetched successfully",
            data: contacts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}

export const editAllContacts = async (req, res) => {
    try {
        const selectedUser = await validateApiKey(req, res);
        if (!selectedUser) return;

        const { name, firstName, lastName, email, message, phone, option1, option2, option3, id } = req.body;

        const contact = await prisma.contacts.findFirst({
            where: {
                id: id,
                userId: selectedUser.id
            }
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        const updateData = {
            name: selectedUser.nameInputStyle === "SINGLE" ? name : undefined,
            fristName: selectedUser.nameInputStyle === "SPLIT" ? firstName : undefined,
            lastName: selectedUser.nameInputStyle === "SPLIT" ? lastName : undefined,
            email: email || undefined,
            message: message || undefined,
            phone: selectedUser.phoneInput ? phone : undefined,
            option1: selectedUser.option1 ? option1 : undefined,
            option2: selectedUser.option2 ? option2 : undefined,
            option3: selectedUser.option3 ? option3 : undefined,
        };

        // Remove undefined values
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        const updatedContact = await prisma.contacts.update({
            where: {
                id: id
            },
            data: updateData
        });

        return res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
}

export const deleteContact = async (req, res) => {
    try {
        const selectedUser = await validateApiKey(req, res);
        if (!selectedUser) return;

        const { id } = req.params;
        
        const contact = await prisma.contacts.findFirst({
            where: {
                id: id,
                userId: selectedUser.id
            }
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        await prisma.contacts.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
}