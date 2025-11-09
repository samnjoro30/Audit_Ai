import mongoose from 'mongoose';
import 'dotenv/config';

function connectToNoSQLDatabase() {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB database');
    });
}
export default connectToNoSQLDatabase;