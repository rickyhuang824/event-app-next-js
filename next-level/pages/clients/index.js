import Link from "next/link";
import React from "react";

const ClientPage = () => {
    const clients = [
        { id: "max", name: "max" },
        { id: "ricky", name: "ricky" },
    ];

    return (
        <div>
            <h1>ClientPage</h1>
            <ul>
                {clients.map((client) => {
                    return (
                        <li key={client.id}>
                            <Link
                                href={{
                                    pathname: "/clients/[id]",
                                    query: { id: client.id },
                                }}
                            >
                                {client.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ClientPage;
