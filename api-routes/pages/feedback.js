import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "./api/feedback";

export default function Feedback(props) {
    const [feedbackData, setFeedbackData] = useState({});

    const loadFeedbackHandler = async (id) => {
        const feedback = await fetch("/api/" + id)
            .then((response) => response.json())
            .then((data) => data.feedback);
        setFeedbackData(feedback);
    };

    return (
        <>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((feedbackItem) => {
                    return (
                        <li key={feedbackItem.id}>
                            {feedbackItem.text}
                            <button
                                onClick={loadFeedbackHandler.bind(
                                    null,
                                    feedbackItem.id
                                )}
                            >
                                Show Details
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export const getStaticProps = async () => {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
};
