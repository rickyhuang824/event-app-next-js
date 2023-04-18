import { useRouter } from "next/router";
import React from "react";

const ClientSpecifyPage = () => {
    const router = useRouter();
    const loadProjectHandler = () => {
        router.push({
            pathname: "/clients/[id]/[clientprojectId]",
            query: { id: "max", clientprojectId: "1" },
        });
    };
    return (
        <div>
            <h1>ClientSpecifyPage</h1>
            <button onClick={loadProjectHandler}>Load to other page</button>
        </div>
    );
};

export default ClientSpecifyPage;
