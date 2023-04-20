import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import useSWR from "swr";
import React, { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

const FilteredEventsPage = (props) => {
    const router = useRouter();
    const [loadedEvents, setLoadedEvents] = useState();
    const filterData = router.query.slug;

    const { data, error, loading } = useSWR(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/events.json",
        fetcher
    );

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                const event = data[key];
                events.push({
                    id: key,
                    ...event,
                });
            }

            setLoadedEvents(events);
        }
    }, [data]);

    if (!loadedEvents) {
        return <p className="center">Loading..</p>;
    }

    const filteredYear = +filterData[0];
    const filteredMonth = +filterData[1];

    if (
        isNaN(filteredYear) ||
        isNaN(filteredMonth) ||
        filteredYear > 2030 ||
        filteredYear < 2021 ||
        filteredMonth < 1 ||
        filteredMonth > 12 ||
        error
    ) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter, please adjust the value</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === filteredYear &&
            eventDate.getMonth() === filteredMonth - 1
        );
    });

    // const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length == 0) {
        return (
            <>
                <ErrorAlert>
                    <p>Can not find any events</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(filteredYear, filteredMonth - 1);
    return (
        <>
            <ResultsTitle date={date} />
            <EventList events={filteredEvents} />;
        </>
    );
};

// export const getServerSideProps = async (context) => {
//     const filterData = context.params.slug;

//     const filteredYear = +filterData[0];
//     const filteredMonth = +filterData[1];

//     if (
//         isNaN(filteredYear) ||
//         isNaN(filteredMonth) ||
//         filteredYear > 2030 ||
//         filteredYear < 2021 ||
//         filteredMonth < 1 ||
//         filteredMonth > 12
//     ) {
//         return {
//             props: {
//                 hasErrors: true,
//             },
//             // notFound: true,
//         };
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: filteredYear,
//         month: filteredMonth,
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: filteredYear,
//                 month: filteredMonth,
//             },
//         },
//     };
// };

export default FilteredEventsPage;
