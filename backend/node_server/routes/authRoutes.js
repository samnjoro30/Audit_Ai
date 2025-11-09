import express from 'express'; 
import {register} from '../controller/authController.js';


const router = express.Router();


router.post('/register', register); 
router.post('/login', (req, res) => {
    res.send('Login endpoint');
});

export default router;