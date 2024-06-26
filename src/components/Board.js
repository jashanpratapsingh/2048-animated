import React, { useState } from 'react';
import Modal from 'react-modal';
import Tile from './Tile';
import Cell from './Cell';
import GameOverlay from './GameOverlay';
import useEvent from '../hooks/useEvent';
import { Board } from './helper';

const customStyles = {
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        background: '#57407c',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '9px',
        outline: 'none',
        padding: '20px'
      }
};

Modal.setAppElement('#root');

export default function BoardView() {
    const [board, setBoard] = useState(new Board());
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const year = new Date().getFullYear(); 

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

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

    const handleKeyDown = (event) => {
        if(board.hasWon()) {
            return;
        }

        if(event.keyCode >= 37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }

    useEvent('keydown', handleKeyDown);

    const resetGame = () => {
        setBoard(new Board());
    }

    return (
        <div>
            <div className='fixed-container'>
                <div className='details-box'>
                    <div className='buttons'>
                        <div className='resetButton margin-right' onClick={resetGame}>New Game</div>
                        <div className='resetButton' onClick={openModal}>Game Rules</div>
                    </div>
                    <div className='score-box'>
                        <div className='score-header'>SCORE</div>
                        <div>{board.score}</div>
                    </div>
                </div>
            
                <div className='board'>
                    {cells}{tiles}
                    <GameOverlay onRestart={resetGame} board={board} />
                </div>               
            </div>
            { modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <div>
                        <div className='footer-rules'>
                                <div className='details-box'>
                                    <div className='text'>
                                        <span>Play 2048 Game Online</span>
                                        <p>Join the numbers and get to the <span>2048 tile!</span></p>
                                    </div>
                                </div>
                                <div className='details-box'>
                                    <div className='text'>
                                        <span>How to Play:</span>
                                        <p>
                                        Use your <span>arrow keys</span> to move the tiles. When two tiles with the same number touch, they <span>merge into one!</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='copyright'>
                                <p>
                                <small>&copy; Copyright {year}</small>, Jashan Pratap Singh
                                </p>
                                <div className='resetButton' onClick={closeModal}>Cancel</div>
                            </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}