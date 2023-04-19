import Link from "next/link";
import path from "path";

function HomePage(props) {
    const products = props.products;

    return (
        <ul>
            {products.map((product) => {
                return (
                    <li key={product.id}>
                        <Link href={`/${product.id}`}>{product.title}</Link>
                    </li>
                );
            })}
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
            products: data.products,
        },
        revalidate: 5,
    };
}

export default HomePage;
