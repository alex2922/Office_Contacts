import express from "express";
import { database } from "../database/database.js";

export const userRouter = express.Router();

userRouter.post("/addUser", async (req, res) => {
  let connection;
  try {
    const { userDetails, payloadDetails } = req.body;
    const { email, password, domain } = userDetails;
    const {
      NameInput,
      PhoneInput,
      EmailInput,
      emailNotification,
      option1,
      option2,
    } = payloadDetails;

    if (!email || !password || !domain) {
      return res.status(400).json({
        message: "email, password and domain are required",
      });
    }

    connection = await database.getConnection();

    await connection.beginTransaction();

    const [user] = await connection.query(
      `INSERT INTO users (email,password,domain) VALUES (?,?,?)`,
      [email, password, domain]
    );
    const userId = user.insertId;

    const [payload] = await connection.query(
      `INSERT INTO paylaods (userId,NameInput,PhoneInput,EmailInput,emailNotification,option1,option2) VALUES (?,?,?,?,?,?,?)`,
      [
        userId,
        NameInput,
        PhoneInput,
        EmailInput,
        emailNotification,
        option1,
        option2,
      ]
    );

    await connection.commit();
    return res.status(200).json({
      message: "user created successfully",
      userId: userId,
      payloadId: payload.insertId,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return res.status(500).json({
      message: error.message,
    });
  }
});

userRouter.get("/getUser", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    const [userData] = await database.query(
        `SELECT 
        u.email, 
        u.password, 
        u.domain, 
        payload.NameInput,
        payload.id, 
        payload.PhoneInput,
        payload.EmailInput,
        payload.emailNotification,
        payload.option1,
        payload.option2 
      FROM users AS u
      INNER JOIN paylaods AS payload 
        ON u.id = payload.userId 
      WHERE u.id = ?`,
      [userId]
    );

    return res.status(200).json({
      message: "user data fetched successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
