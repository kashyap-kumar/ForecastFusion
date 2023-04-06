import React from "react";

const NotFound = () => {
    const styles = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#edf0f0"
    }
    return (
        <div style={styles} className="p-4 mt-2 mt-md-0 rounded-4">
            <h2 className="display-4">Not Found</h2>
            <p className="lead text-muted">What are you looking for?</p>
        </div>
    );
};

export default NotFound;
