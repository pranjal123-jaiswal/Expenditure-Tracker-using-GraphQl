import mongoose from 'mongoose';

export const connectDB = async () => {
    // mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};
