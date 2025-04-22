import express from "express";
import { database } from "../database/database.js";
import { sendMail } from "../utils/nodemailer.js";

export const contactRouter = express.Router();

contactRouter.post("/addContact", async (req, res) => {
  try {
    const { userId } = req.query;
    const { name, fname, lname, number, email, message, option1, option2 } =
      req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userid is required",
      });
    }

    const [payload] = await database.query(
      `SELECT * FROM paylaods WHERE userId=?`,
      [userId]
    );

    const paylaodData = payload[0];

    const feilds = ["userId"];
    const values = [userId];

    if (paylaodData.NameInput) {
      feilds.push("fname", "lname");
      values.push(fname || null, lname || null);
    }

    if (!paylaodData.NameInput) {
      feilds.push("name");
      values.push(name || null);
    }

    if (paylaodData.PhoneInput) {
      feilds.push("number");
      values.push(number || null);
    }

    if (paylaodData.EmailInput) {
      feilds.push("email");
      values.push(email || null);
    }

    if (message !== undefined) {
      feilds.push("message");
      values.push(message || null);
    }
    const option1Value = req.body[paylaodData.option1] || null;
    if (paylaodData.option1) {
      feilds.push("option1");
      values.push(option1Value);
    }
    const option2Value = req.body[paylaodData.option2] || null;
    if (paylaodData.option2) {
      feilds.push("option2");
      values.push(option2Value);
    }

    const sql = `INSERT INTO contactsData (${feilds.join(
      ", "
    )}) VALUES (${feilds.map(() => "?").join(", ")})`;

    await database.query(sql, values);

    const [useremail] = await database.query(
      `SELECT email FROM users WHERE userId=?`,
      [userId]
    );

    const userEmailId = useremail[0].email;

    if (paylaodData.emailNotification === 1) {
      const messageformat = `
      Name :${name || `${fname || ""} ${lname || ""}`.trim()}
      Phone: ${number || ""}
      Email: ${email || ""}
      Message:${message || ""}
      ${
        paylaodData.option1
          ? `${paylaodData.option1}: ${option1Value || ""}`
          : ""
      }
      ${
        paylaodData.option2
          ? `${paylaodData.option2}: ${option2Value || ""}`
          : ""
      }
      `;

      await sendMail(userEmailId, messageformat);
    }

    return res.status(200).json({
      message: "contact add successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

contactRouter.get("/getContacts", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    const [response] = await database.query(
      `SELECT * FROM contactsData WHERE userId = ?`,
      [userId]
    );

    const [payload] = await database.query(
      `SELECT * FROM paylaods WHERE userId = ?`,
      [userId]
    );

    const paydata = payload[0];
    const { option1, option2 } = paydata;

    const mappedData = response.map((item) => {
      const obj = {
        id: item.id,
        name: item.name || null,
        fname: item.fname || null,
        lname: item.lname || null,
        number: item.number,
        email: item.email,
        message: item.message,
      };

      // Add dynamic key for option1
      if (option1) {
        obj[option1] = item.option1 || null;
      }

      // Add dynamic key for option2
      if (option2) {
        obj[option2] = item.option2 || null;
      }

      return obj;
    });

    return res.status(200).json({
      message: "success",
      data: mappedData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

contactRouter.get("/getAllContacts", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "userid is requried",
      });
    }

    const [user] = await database.query(
      `SELECT role FROM users WHERE userId=?`,
      [userId]
    );

    if (user[0].role !== "admin") {
      return res.status(400).json({
        message: "you are not admin",
      });
    }

    // Fetch contacts data from the database
    const [response] = await database.query(
      `SELECT * FROM contactsData ORDER BY userid, created_at`
    );

    const groupedByUserId = response.reduce((acc, row) => {
      const userId = row.userid || "unknown"; // Default to "unknown" if userId is null or undefined
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(row);
      return acc;
    }, {});

    // Return the grouped data with a success message and status 200
    return res.status(200).json({
      message: "success",
      data: groupedByUserId,
    });
  } catch (error) {
    // Return an error message and status 500 if something goes wrong
    return res.status(500).json({
      message: error.message,
    });
  }
});
