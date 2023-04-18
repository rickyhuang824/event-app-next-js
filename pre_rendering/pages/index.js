import path from "path";

function HomePage(props) {
    return (
        <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
        </ul>
    );
}

export async function getStaticProps() {
    const fs = require("fs").promises;
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if (!data) {
        return { redirect: { destination: "https://google.com" } };
    }

    if (!data.products) {
        return { notFound: true };
    }

    return {
        props: {
            product: data.products,
        },
        revalidate: 120,
    };
}

export default HomePage;
