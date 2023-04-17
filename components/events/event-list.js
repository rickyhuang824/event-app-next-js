import React from "react";
import EventItem from "./event-item.js";
import classes from "./event-list.module.css";

const EventList = ({ events }) => {
    console.log(events);
    return (
        <ul className={classes.list}>
            {events.map((event) => {
                return (
                    <EventItem
                        id={event.id}
                        title={event.title}
                        location={event.location}
                        date={event.date}
                        image={event.image}
                        key={event.id}
                    />
                );
            })}
        </ul>
    );
};

export default EventList;
