import { MongoClient } from "mongodb";

const connectToDatabase = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.dgpy9yx.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(client);

    return client;
};

export { connectToDatabase };
