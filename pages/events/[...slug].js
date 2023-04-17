import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = () => {
    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
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
        filteredMonth > 12
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

    const filteredEvents = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth,
    });

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

export default FilteredEventsPage;
