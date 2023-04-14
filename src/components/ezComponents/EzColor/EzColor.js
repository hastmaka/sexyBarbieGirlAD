import PropTypes from "prop-types";

export default function EzColor({color}) {
    return (
        <div
            style={{
                height: '20px',
                width: '20px',
                borderRadius: '5px',
                backgroundColor: color
            }}
        />
    );
}

EzColor.prototype = {
    color: PropTypes.string.isRequired
}