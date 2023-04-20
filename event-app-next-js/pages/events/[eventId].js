import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getFeaturedEvents } from "@/dummy-data";
import { getAllEvents, getEventById } from "@/helpers/api-utils";
import React from "react";

const EventDetailPage = (props) => {
    const event = props.event;

    if (!event) {
        return (
            <div className="center">
                <p>No event found.</p>
            </div>
        );
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    );
};

export const getStaticProps = async (context) => {
    const { params } = context;
    const event = await getEventById(params.eventId);

    return { props: { event }, revalidate: 30 };
};

export const getStaticPaths = async () => {
    const events = await getFeaturedEvents();
    const pathsWithParams = events.map((event) => ({
        params: { eventId: event.id },
    }));

    return {
        paths: pathsWithParams,
        fallback: true,
    };
};

export default EventDetailPage;
