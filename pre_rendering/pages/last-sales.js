import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());
const LastSale = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(true);

    const { data, error, isLoading } = useSWR(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json",
        fetcher
    );

    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    // useEffect(() => {
    //     console.log(data);
    //     if (data) {
    //         setSales(data);
    //     }
    // }, [data]);

    // useEffect(() => {
    //     fetch(
    //         "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json"
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const transformedSales = [];

    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }
    //             console.log(transformedSales);
    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    if (error) {
        return <p>There is an error</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    );
};

export const getStaticProps = async () => {
    const data = await fetch(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json"
    ).then((response) => response.json());

    const transformedSales = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return {
        props: { sales: transformedSales },
        revalidate: 1000,
    };
};

export default LastSale;
