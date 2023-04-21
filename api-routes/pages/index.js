import { useRef, useState } from "react";

const HomePage = () => {
    const emailInputRef = useRef();
    const feedbackInputRef = useRef();
    const [feedbackItems, setFeedbackItems] = useState([]);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;

        fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                text: enteredFeedback,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseData) => console.log(responseData));
    };

    const loadFeedbackHandler = () => {
        fetch("/api/feedback")
            .then((response) => response.json())
            .then((responseData) => setFeedbackItems(responseData.feedback));
    };

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="email">Your Email address</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor="feedback">Your Feedback</label>
                    <textarea
                        id="feedback"
                        rows="5"
                        ref={feedbackInputRef}
                    ></textarea>
                </div>
                <button>submit</button>
            </form>
            <hr />
            <button onClick={loadFeedbackHandler}>Load Feedback</button>
            <ul>
                {feedbackItems.map((feedbackItem) => (
                    <li key={feedbackItem.id}>{feedbackItem.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
