import React, {useState} from 'react';
import Tile from './Tile';
import Cell from './Cell';
import {Board} from "./helper";
import useEvent from "../hooks/useEvent";

const BoardView = () => {
    const [board,setBoard] = useState(new Board());

    const handleKeyDown = (event) => {
        if (board.hasWon()){
            return;
        }

        if(event.keyCode>=37 && event.keyCode<=40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
        }
    }

    useEvent('keydown', handleKeyDown)

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                { row.map((col, colIndex) => {
                    return <Cell key={rowIndex*board.size + colIndex} />
                })}
            </div>
        )
    });

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, tileIndex) => {
        return (<Tile tile={tile} key={tileIndex} />)
    });

    return ( <div>
        <div className="board">
            {cells}{tiles}
        </div>
    </div>

    )
}

export default BoardView;