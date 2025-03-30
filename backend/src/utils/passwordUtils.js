import bcrypt from "bcrypt";

export async function generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
} 