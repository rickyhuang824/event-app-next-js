import React from "react";
import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";

const Home = () => {
    const featutredEvents = getFeaturedEvents();
    return (
        <div>
            <ul>
                <EventList events={featutredEvents} />
            </ul>
        </div>
    );
};

export default Home;
