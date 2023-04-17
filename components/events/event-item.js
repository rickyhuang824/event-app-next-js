import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventItem = (props) => {
    const { title, image, date, location, id } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedAddress = location.replace(",", "\n");
    const exploreLink = `/events/${id}`;

    return (
        <li>
            <img src={`/${image}`} alt="" />
            <div>
                <div>
                    <h2>{title}</h2>
                </div>
                <div>
                    <time>{humanReadableDate}</time>
                </div>
                <div>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div>
                <Link href={exploreLink}>Explore Event</Link>
            </div>
        </li>
    );
};

export default EventItem;
