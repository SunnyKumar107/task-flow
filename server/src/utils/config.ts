import { config } from 'dotenv'

config()

const PORT: number | string = process.env.PORT || 3001

const MONGODB_URI: string | undefined =
  process.env.NODE_ENV === 'development' ? process.env.DEV_MONGODB_URI : process.env.MONGODB_URI

export default {
  PORT,
  MONGODB_URI
}
