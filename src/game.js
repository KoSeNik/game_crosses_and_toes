import { Information } from './information';
import { Field } from './field';
import styles from './game.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const GameLayout = ({
	currentPlayer,
	isGameEnded,
	isDraw,
	field,
	handleClickCell,
	clickReset,
	winningIndex,
}) => (
	<div className={styles.game}>
		<Information
			currentPlayer={currentPlayer}
			isDraw={isDraw}
			isGameEnded={isGameEnded}
		/>
		<Field
			field={field}
			handleClickCell={handleClickCell}
			winningIndex={winningIndex}
		/>
		<button onClick={() => clickReset()}>Начать заново</button>
	</div>
);

GameLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	field: PropTypes.array,
	handleClickCell: PropTypes.func,
	winningIndex: PropTypes.number,
	clickReset: PropTypes.func,
};

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(Array(9).fill(''));
	const [winningIndex, setWinningIndex] = useState(null);

	const handleClickCell = (index) => {
		if (field[index] === '' && isGameEnded === false) {
			const nextField = field.slice();
			nextField[index] = currentPlayer;
			setField(nextField);
			checkDraw(nextField);
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
			checkWinner(nextField);
		}
	};

	const checkDraw = (field) => {
		if (!field.includes('') && isGameEnded !== true) setIsDraw(true);
	};

	const checkWinner = (field) => {
		const WIN_PATTERNS = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // Варианты побед по горизонтали
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // Варианты побед по вертикали
			[0, 4, 8],
			[2, 4, 6], // Варианты побед по диагонали
		];
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (field[a] && field[a] === field[b] && field[a] === field[c]) {
				setIsGameEnded(true);
				setCurrentPlayer(currentPlayer);
				setIsDraw(false);
				setWinningIndex(WIN_PATTERNS[i]);
			}
		}
	};

	const clickReset = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(Array(9).fill(''));
		setWinningIndex(null);
	};

	return (
		<GameLayout
			currentPlayer={currentPlayer}
			isGameEnded={isGameEnded}
			isDraw={isDraw}
			field={field}
			handleClickCell={handleClickCell}
			clickReset={clickReset}
			winningIndex={winningIndex}
		/>
	);
};
