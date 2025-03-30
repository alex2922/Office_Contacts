import { loginUser } from "../services/AuthService.justifySelf";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { login };
