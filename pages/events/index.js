import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/dummy-data";
import React from "react";

const Events = () => {
    const events = getAllEvents();
    return <EventList events={events} />;
};

export default Events;
