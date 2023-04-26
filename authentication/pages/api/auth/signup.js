import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
    if (req.method == "POST") {
        const { email, password } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.trim().length < 7
        ) {
            res.status(422).json({ message: "Invalid email or password" });
            return;
        }

        const client = await connectToDatabase();
        const db = client.db(process.env.MONGODB_DATABASE);
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
            res.status(422).json({ message: "User already exists" });
            client.close();
            return;
        }

        const result = await db.collection("users").insertOne({
            email: email,
            password: await hashPassword(password),
        });

        res.status(201).json({ message: "Created User!" });
        client.close();
    }

    return;
};

export default handler;
