import { useRouter } from "next/router";
import React from "react";

const ClientProject = () => {
    const router = useRouter();
    console.log(router.query);
    return <div>Client Proejcts</div>;
};

export default ClientProject;
