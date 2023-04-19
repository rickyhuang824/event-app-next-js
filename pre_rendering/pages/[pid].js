import React from "react";
import path from "path";

const ProductDetailPage = ({ product }) => {
    if (!product) {
        return <p>loading...</p>;
    }
    return (
        <>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </>
    );
};

const getData = async () => {
    const fs = require("fs").promises;
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
};

export const getStaticProps = async (context) => {
    const { params } = context;
    const productId = params.pid;

    const data = await getData();

    if (!data) {
        return { redirect: { destination: "https://google.com" } };
    }

    const product = data.products.find((product) => product.id === productId);
    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            product: product,
        },
    };
};

export const getStaticPaths = async () => {
    const { products } = await getData();
    const ids = products.map((product) => product.id);
    const pathsWithParams = ids.map((id) => ({
        params: {
            pid: id,
        },
    }));

    return {
        paths: pathsWithParams,
        fallback: true,
    };
};

export default ProductDetailPage;
