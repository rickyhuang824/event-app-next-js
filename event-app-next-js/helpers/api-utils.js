export const getFeaturedEvents = async () => {
    const data = await fetch(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/events.json"
    ).then((response) => response.json());

    const featuredEvents = [];

    for (const key in data) {
        const event = data[key];
        if (event.isFeatured) {
            featuredEvents.push({
                id: key,
                ...event,
            });
        }
    }

    return featuredEvents;
};

export const getAllEvents = async () => {
    const data = await fetch(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/events.json"
    ).then((response) => response.json());

    const events = [];

    for (const key in data) {
        const event = data[key];
        events.push({
            id: key,
            ...event,
        });
    }

    return events;
};

export const getEventById = async (id) => {
    const data = await fetch(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/events.json"
    ).then((response) => response.json());

    const event = {
        id,
        ...data[id],
    };

    return event;
};

export const getFilteredEvents = async (dateFilter) => {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
        );
    });

    return filteredEvents;
};
