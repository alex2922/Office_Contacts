import{database} from "../database/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const query = `SELECT * FROM users WHERE email = $1`
    const result = await database.query(query, [email]);
    if (!result.rows.length) {
        throw new Error("Invalid Credentails");
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid Credentails");
    }

    const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
    return {token, username: user.username, role: user.role};
    
    
    
}

export default {loginUser};