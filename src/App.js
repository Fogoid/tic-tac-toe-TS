import {useState} from 'react';

export default function Game() {
    function gotoMove(i) {
        const newHistory = history.slice(0, i + 1);
        setHistory(newHistory);
        setCurrentMove(i);
    }

    function handlePlay(new_squares) {
        const newHistory = history.slice();
        newHistory.push(new_squares);
        setHistory(newHistory);
        setCurrentMove(currentMove + 1);
    }

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currBoard = history[currentMove];

    const moves = history.map((_squares, move) => {
        let desc = move === 0 ? 'Go to game start' : 'Go to move #' + move;
        return (
            <li id={move}>
                <button onClick={() => gotoMove(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={currBoard} xIsNext={xIsNext} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )

}

function Board({squares, xIsNext, onPlay}) {
    function handleClick(i) {
        if (squares[i] !== null || calculate_winner(squares) !== null) {
            return;
        }

        const nextSquares = squares.slice();
        const nextMove = xIsNext ? "X" : "O";
        nextSquares[i] = nextMove;

        onPlay(nextSquares);
    }

    const winner = calculate_winner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    );
}

function calculate_winner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}
