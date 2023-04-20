import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import React from "react";

const Events = (props) => {
    const { events } = props;
    const router = useRouter();
    const findEventsHandler = (year, month) => {
        router.push(`/events/${year}/${month}`);
    };
    return (
        <>
            <EventSearch onSearch={findEventsHandler} />
            <EventList events={events} />;
        </>
    );
};

export const getStaticProps = async () => {
    const events = await getAllEvents();
    return {
        props: {
            events,
        },
        revalidate: 60,
    };
};

export default Events;
