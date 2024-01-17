import {useState} from 'react';

export default function Board() {
    function handleClick(i) {
        if (squares[i] !== null || calculate_winner(squares) !== null) {
            return;
        }

        const nextSquares = squares.slice();
        const nextMove = nextPlayer === true ? "X" : "O";
        nextSquares[i] = nextMove;
        setSquares(nextSquares);
        setNextPlayer(!nextPlayer);
    }

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [nextPlayer, setNextPlayer] = useState(true);

    const winner = calculate_winner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (nextPlayer ? 'X' : 'O');
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
