import UserProfile from "../components/profile/user-profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

function ProfilePage() {
    return <UserProfile />;
}

export default ProfilePage;

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
