import dotenv from 'dotenv';
dotenv.config();

const atlasUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}?retryWrites=true&w=majority`;

export default atlasUri;
