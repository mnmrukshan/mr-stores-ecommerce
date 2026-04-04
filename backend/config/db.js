import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI.endsWith('/') ? process.env.MONGO_URI + "dress_store" : process.env.MONGO_URI + "/dress_store";
        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;