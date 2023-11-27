import styles from './field.module.css';
import PropTypes from 'prop-types';

const Cell = ({ index, cell, handleClickCell, winningIndex }) => {
	return (
		<div
			className={`${styles.cell} ${
				winningIndex !== null && winningIndex.includes(index)
					? styles.winningCell
					: ''
			}`}
			onClick={() => {
				handleClickCell(index);
			}}
		>
			{cell}
		</div>
	);
};

Cell.propTypes = {
	index: PropTypes.number,
	cell: PropTypes.array,
	handleClickCell: PropTypes.func,
	winningIndex: PropTypes.number,
};

const FieldLayout = ({ field, handleClickCell, winningIndex }) => (
	<div className={styles.field}>
		{field.map((cell, index) => (
			<Cell
				index={index}
				cell={cell}
				handleClickCell={handleClickCell}
				winningIndex={winningIndex}
			/>
		))}
	</div>
);

FieldLayout.propTypes = {
	field: PropTypes.array,
	handleClickCell: PropTypes.func,
	winningIndex: PropTypes.number,
};

export const Field = ({ field, handleClickCell, winningIndex }) => {
	return (
		<FieldLayout
			field={field}
			handleClickCell={handleClickCell}
			winningIndex={winningIndex}
		/>
	);
};

Field.propTypes = {
	field: PropTypes.array,
	handleClickCell: PropTypes.func,
	winningIndex: PropTypes.number,
};
