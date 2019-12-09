import React, { useEffect } from "react";
const Effect = ({ fn }) => {
    useEffect(() => {
        fn();
    }, []);
    return React.createElement(React.Fragment, null);
};
export default Effect;
