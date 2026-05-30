import mongoose from 'mongoose'


const connectdb = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error('Missing MongoDB connection string. Set MONGODB_URI in .env');
    }

    if (
        !mongoUri.startsWith('mongodb://') &&
        !mongoUri.startsWith('mongodb+srv://')
    ) {
        throw new Error(
            'Invalid MongoDB URI. It must start with "mongodb://" or "mongodb+srv://"',
        );
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('mongodb connected');
    } catch (error) {
        console.log('db connection failed', error);
        throw error;
    }
}

export default connectdb;
