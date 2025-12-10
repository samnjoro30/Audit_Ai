import { users } from '../schema/User.js';
import { refreshTokens } from '../schema/refreshToken.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from "drizzle-orm";
import { db } from '../config/database_sql.js';

export const register = async (req, res) => {
    try {
        const { email, companyname, phonenumber, password } = req.body;

        if (!email || !companyname || !password || !phonenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
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
    const {email, password} = req.body;
    try{
    
        const ExistingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));
    
        if (user.length === 0) return res.status(409).json({ message: "Email not registered" });

        const user = ExistingUser[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)  return res.status(401).json({ message: "Invalid password" });

        const payload ={
           userId: user.id,
           email: user.email
        }

        const accessToken = jwt.sign(
           payload,
           process.env.JWT_SECRET,
           {expiresIn: '1h'}
        )
        
        const refreshToken = jwt.sign(
           payload,
           process.env.JWT_REFRESH_SECRET,
           {expiresIn: '7d'}
        )
        await db.insert(refreshTokens).values({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
          

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1 * 60 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    
        return res.status(200).json({
            message: "Login successful"
        });
    }catch(err){
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const refreshToken = async (req, res) => {
    const clientRefreshToken= req.cookies.refreshToken;

    if (!clientRefreshToken) return res.status(401).json({ message: "Missing refresh token" });

    try {
        const storedToken = await db
          .select()
          .from(refreshTokens)
          .where(eq(refreshTokens.token, refreshToken));

        if (storedToken.length ===0) return res.status(403).json({ message: "Invalid refresh token" });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Expired refresh token" });

            const payload = { userId: decoded.userId, email: decoded.email };

            // Generate new access token
            const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 15 * 60 * 1000,
            });

            return res.json({ message: "Access token refreshed" });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}

export const logout = async (req, res) => {
    const clientRefreshToken = req.cookies.refreshToken;

    try {
        await db
            .delete(refreshTokens)
            .where(eq(refreshTokens.token, clientRefreshToken));

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Error logging out" });
    }
};
