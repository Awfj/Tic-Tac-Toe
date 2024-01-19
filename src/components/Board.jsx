import PropTypes from "prop-types";
import Cell from "./Cell.jsx";

export default function Board({history, turn, handleTurn}) {
    return <div id="board">
        {history.map((value, index) => (
            <Cell key={index} onClick={() => handleTurn(index)}>{value}</Cell>
        ))}
    </div>
}

Board.propTypes = {

}