import React from "react";
import { getFeaturedEvents } from "@/helpers/api-utils";
import EventList from "@/components/events/event-list";
import Head from "next/head";

const Home = (props) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="descriptions" content="example for meta" />
            </Head>
            <ul>
                <EventList events={props.featuredEvents} />
            </ul>
        </div>
    );
};

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return { props: { featuredEvents }, revalidate: 1800 };
};
export default Home;
