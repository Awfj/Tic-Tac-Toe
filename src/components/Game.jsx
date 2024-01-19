import Board from "./Board.jsx";
import {useEffect, useState} from "react";

const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([new Array(9).fill(null)]);
    const [currentSetup, setCurrentSetup] = useState(history[0]);
    const [turn, setTurn] = useState(0);
    const [completed, setCompleted] = useState(false);

    function check(state) {
        for (let line of LINES) {
            if (state[line[0]] && state[line[0]] === state[line[1]] && state[line[0]] === state[line[2]]) {
                setCompleted(true);
                break;
            }
        }
    }

    function rollBack(index) {
        setCurrentSetup(history[index]);
        setTurn(index);



        /*let hist = history.toSpliced(0, index);
        setHistory(hist);*/
    }

    function handleTurn(index) {
        if (completed || history[turn][index]) {
            return;
        }

        let state;
        if (turn < history.length - 1) {
            state = history.toSpliced(turn + 1)[turn].slice();


            setTurn(turn + 1);
            setXIsNext(!xIsNext);
            state[index] = xIsNext ? "X" : "O";
            setHistory([...history.toSpliced(turn + 1), state]);

            check(state);
            //setTurn(turn + 1);
            //state[index] = xIsNext ? "X" : "O";
            //setHistory(state);
        } else {
            state = history[turn].slice();

            setTurn(turn + 1);
            setXIsNext(!xIsNext);
            state[index] = xIsNext ? "X" : "O";
            setHistory([...history, state]);

            check(state);
        }

        //let state = history[turn].slice();

        /*setTurn(turn + 1);
        setXIsNext(!xIsNext);
        state[index] = xIsNext ? "X" : "O";
        setHistory([...history, state]);

        check(state);*/


    }

    useEffect(() => {
        setCurrentSetup(history.at(-1))
    }, [history]);

    return (
        <>
            <h1>Tic-Tac-Toe</h1>
            <p>{completed ? `Winner: ${xIsNext ? "O" : "X"}` : `Next: ${xIsNext ? "X" : "O"}`}</p>
            <Board history={currentSetup} turn={turn} handleTurn={handleTurn}/>
            <h2>Previous states:</h2>
            <div id="history">
                <ol>
                    {/*{history.map((step, index) => <li key={index} onClick={() => rollBack(index)}>Step</li>)}*/}
                    {history.map((step, index) => (
                        <li key={index} onClick={() => rollBack(index)}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>{history[index][0]}</td>
                                    <td>{history[index][1]}</td>
                                    <td>{history[index][2]}</td>
                                </tr>
                                <tr>
                                    <td>{history[index][3]}</td>
                                    <td>{history[index][4]}</td>
                                    <td>{history[index][5]}</td>
                                </tr>
                                <tr>
                                    <td>{history[index][6]}</td>
                                    <td>{history[index][7]}</td>
                                    <td>{history[index][8]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </li>

                    ))}
                </ol>
            </div>
        </>
    );
}