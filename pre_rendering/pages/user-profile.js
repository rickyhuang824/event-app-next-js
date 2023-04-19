import React from "react";

const UserProfile = (props) => {
    return <div>{props.username}</div>;
};

export default UserProfile;

export const getServerSideProps = async (context) => {
    const { param, req, res } = context;
    return {
        props: {
            username: "tiff",
        },
    };
};
