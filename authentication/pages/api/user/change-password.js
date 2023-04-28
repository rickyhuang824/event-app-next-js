import { getServerSession } from "next-auth";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
    if (req.method == "PUT") {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            res.status(401).json({ message: "You are not authenticated" });
            return;
        }

        const email = session.user.email;
        const client = await connectToDatabase();
        const usersCollection = client
            .db(process.env.MONGODB_DATABASE)
            .collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            client.close();
            return;
        }

        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const isOldPasswordMatch = verifyPassword(oldPassword, user.password);

        if (!isOldPasswordMatch) {
            res.status(403).json({ message: "Old Password does not match" });
            client.close();
            return;
        }

        if (!newPassword || newPassword.trim().length < 7) {
            res.status(422).json({ message: "Invalid new password" });
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(newPassword);
        const result = await usersCollection.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        res.status(200).json({ message: "Password Updated" });
        client.close();
    }

    return;
};

export default handler;
