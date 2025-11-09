import Company from '../model/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const { email, userId, name, password } = req.body;

        if (!email || !userId || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists already
        const exists = await Company.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const company = new Company({
            userId,
            name,
            email,
            password: hashedPassword
        });

        await company.save();

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
