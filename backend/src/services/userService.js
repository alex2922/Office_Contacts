import  {database} from "../database/config";
import bcrypt from "bcrypt";



const createUser = async (adminId, domain, role, email, password, option1, option2, splitName, phoneInput, emailNotify) => {

    const adminQuery = "SELECT role FROM users WHERE id = $1";
    const adminResult = await database.query(adminQuery, [adminId]);

    if (adminResult.rows.length === 0 || adminResult.rows[0].role !== "admin") {
        throw new Error("Unauthorized: Only admins can create users.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const insertQuery = `
        INSERT INTO users (domain, role, email, password, option1, option2, splitName, phoneInput, emailNotify)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, domain, role, email
    `;

    const values = [
        domain, 
        role || "user", 
        email, 
        hashedPassword, 
        option1 || null, 
        option2 || null, 
        splitName || false, 
        phoneInput || false, 
        emailNotify || false
    ];

    const result = await database.query(insertQuery, values);
    return result.rows[0];
};

export { createUser };