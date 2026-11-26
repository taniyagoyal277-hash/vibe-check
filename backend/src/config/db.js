import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production';

  // In production, MONGODB_URI is required — exit loudly if missing
  if (!uri && isProduction) {
    console.error('❌ MONGODB_URI environment variable is not set. Set it in your Render dashboard and redeploy.');
    process.exit(1);
  }

  const resolvedUri = uri || 'mongodb://127.0.0.1:27017/vibecheck';

  try {
    await mongoose.connect(resolvedUri, {
      serverSelectionTimeoutMS: isProduction ? 10000 : 2500,
    });
    console.log(`🌸 MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    return;
  } catch (err) {
    console.warn(`⚠️ Could not connect to MongoDB at ${resolvedUri}: ${err.message}`);
  }

  // Local-only fallback: try in-memory MongoDB (devDep, skipped in prod)
  if (!isProduction) {
    try {
      console.log('🔄 Attempting to initialize in-memory MongoDB for local development...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      console.log(`✨ Connected to in-memory MongoDB at: ${memUri}`);
      return;
    } catch (memErr) {
      console.warn(`⚠️ In-memory MongoDB not available: ${memErr.message}`);
    }
  }

  // Production with no DB → crash fast so Render can show the error
  if (isProduction) {
    console.error('❌ Failed to connect to MongoDB. Exiting.');
    process.exit(1);
  }

  console.warn('⚠️ Running without MongoDB — database operations will fail.');
};

export default connectDB;
