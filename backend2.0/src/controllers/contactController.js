import { prisma } from "../config/dbConfig.js";


export const AddContact = async (req, res) => {
    try {
        const { name, firstName, lastName, email, message, phone, option1, option2, option3 } = req.body;
        const apiKey = req.headers.authorization;
        const selectedUser = await prisma.user.findUnique({
            where: {
                apiKey: apiKey,
            },
        });

        if (!selectedUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const finalData = {
            name: name,
            firstName:  selectedUser.nameInputStyle === "SPLIT" ? firstName : "" ,
            lastName:  selectedUser.nameInputStyle === "SPLIT" ? lastName : "" ,
            name: selectedUser.nameInputStyle === "SINGLE" ? name : "" ,
            email: email,
            message: message,
            phone:  selectedUser.phoneInput ? phone : "" ,
            option1: selectedUser.option1 ? option1 : "" ,
            option2: selectedUser.option2 ? option2 : "" ,
            option3: selectedUser.option3 ? option3 : "" ,
        };

        const contact = await prisma.contacts.create({
            data: finalData,
        });

        return res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: contact,
          });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}
