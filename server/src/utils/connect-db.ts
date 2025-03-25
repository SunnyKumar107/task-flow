import mongoose from 'mongoose'

import config from './config.js'
import logger from './logger.js'

async function connectDb(): Promise<void> {
  if (!config.MONGODB_URI) {
    logger.error('MONGODB_URI not defined')
    return
  }

  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Error connecting to MongoDB:', err.message)
    } else {
      logger.error('Unknown error connecting to MongoDB')
    }
  }
}

export default connectDb
