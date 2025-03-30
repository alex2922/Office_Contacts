import { createUser } from "../services/userService.js";

const createNewUser = async (req, res) => {
    try {
        const adminId = req.user.id; // Extracted from JWT (set by authMiddleware)
        const { role, domain, email, password, ...options } = req.body;

        const newUser = await createUser(adminId, role, domain, email, password, options);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { createNewUser };
