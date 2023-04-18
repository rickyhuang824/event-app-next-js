import Link from "next/link";
import React from "react";

const Home = () => {
    return (
        <div>
            Home
            <ul>
                <li>
                    <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                    <Link href="/client">Client</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
