import {prisma} from "../config/dbConfig.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import crypto from "crypto";
import { response } from "express";


const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d";

const generateApiKey = () => crypto.randomBytes(32).toString("hex");

export const signup = async (req, res) =>{
  try {
    const {
      role,
      userName,
      password,
      domainAddress,
      nameInputStyle,
      phoneInput,
      emailNotification,
      option1,
      option2,
      option3,
      option1Name,
      option2Name,
      option3Name
    } = req.body;

    if (!["CLIENT", "ADMIN"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }



    const sanitizedUserName = validator.normalizeEmail(userName);
    if (!validator.isEmail(sanitizedUserName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userName format"
      });
    }

    let user = await prisma.user.findFirst({
      where: { userName: sanitizedUserName }
    })

    let apiKey = generateApiKey();

    // Check if API key already exists
    let existingUser = await prisma.user.findFirst({
      where: { apiKey }
    });

    // If the API key exists (which is extremely rare), generate a new one
    while (existingUser) {
      apiKey = generateApiKey(); // Generate a new one
      existingUser = await prisma.user.findFirst({
        where: { apiKey }
      });
    }


    if (!user) {

      user =  await prisma.user.create({
       data: {
         userName: sanitizedUserName,
         password: hashSync(password, 10),
         role : "CLIENT",
         domainAddress,
         nameInputStyle,
         phoneInput,
         emailNotification,
         option1,
         option2,
         option3,
         option1Name,
         option2Name,
         option3Name,
         apiKey : crypto.randomBytes(32).toString("hex")
       },
     });

    } else {
      return res.status(400).json({
        success: false,
        message: "User already exist"
      });
    }


    
    const token = jwt.sign({id : user.id} , process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRATION
    })

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          id: user.id,
          userName: user.userName,
          domainAddress:user.domainAddress,
          apiKey : user.apiKey
        }
      }
    });

  }
  
  catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


export const signin = async (req,res) => {
  try {
    const { userName, password } = req.body;
    if(!userName || !password) {
      return res.status(400).json({
        success:false,message: "All fields are required"
      })
    }

    let user = await prisma.user.findFirst({
      where:{userName : userName}
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          userName : user.userName,
          domainAddress: user.domainAddress,


        }
      }
    });
  }
  catch (e) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: process.env.NODE_ENV === "development" ? e.message : undefined
    });
  }
}