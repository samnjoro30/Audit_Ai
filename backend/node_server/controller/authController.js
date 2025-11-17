import { users } from '../schema/User.js';
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { db } from '../config/database_sql.js';

export const register = async (req, res) => {
    try {
        const { email, companyname, phonenumber, password } = req.body;

        if (!email || !companyname || !password || !phonenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists already
        const existingUser = await db
           .select()
           .from(users)
           .where(eq(users.email, email));

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            email,
            companyname,
            phonenumber,
            password: hashedPassword,
          });


        return res.status(201).json({
            message: 'Company registered successfully'
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    return res.status(200).json({ message: "Login endpoint" });
};
