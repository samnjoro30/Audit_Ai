import Company from '../model/User';
import bcrypt from 'bcrypt';


const register = async (req, res) => {
    const { email, userId, name, password } = req.body;

    if(!email) return res.status(400).json({
        message: "Email is required"
    })
    if(!userId) return res.status(400).json({
        message: "User ID is required"
    })
    if(!name) return res.status(400).json({
        message: "Name is required"
    })
    if(!password) return res.status(400).json({
        message: "Password is required"
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new Company({
        userId: userId,
        name: name,
        email: email,
        password: hashedPassword
    })

    await company.save();

    return res.status(200).json({
        message: 'company registered successfully'
    })


}

const login = () => {

}

export default {
    register,
    login
}