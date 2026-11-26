import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vibecheck';

  try {
    // Attempt standard connection with a short timeout to fail fast if no local server
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`🌸 MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.warn(`⚠️ Could not connect to MongoDB at ${uri}: ${err.message}`);

    // If local MongoDB is not running, fallback to in-memory MongoDB for smooth local testing
    try {
      console.log('🔄 Attempting to initialize in-memory MongoDB instance for local development...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      console.log(`✨ Connected to in-memory MongoDB at: ${memUri}`);
    } catch (memErr) {
      console.error(`❌ In-memory MongoDB failed to start: ${memErr.message}`);
      console.warn('⚠️ Server will continue running, but MongoDB operations will fail until MongoDB is started.');
    }
  }
};

export default connectDB;
