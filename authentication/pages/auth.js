import AuthForm from "../components/auth/auth-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {
    const { data: session, status } = useSession();
    const routes = useRouter();

    if (status === "loading") {
        return <p>loading</p>;
    }

    if (status === "authenticated") {
        routes.replace("/profile");
    }

    return <AuthForm />;
}

export default AuthPage;
