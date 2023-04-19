import React from "react";

const UserIdPage = (props) => {
    return <div>{props.id}</div>;
};

export default UserIdPage;

export const getServerSideProps = async (context) => {
    const { params, req, res } = context;
    return {
        props: { id: "user-id" + params.uid },
    };
};
