import PropTypes from "prop-types";

export default function Cell({onClick, children}) {
    return <div className="cell" onClick={onClick}>{children}</div>
}

Cell.propTypes = {
    history: PropTypes.array
}