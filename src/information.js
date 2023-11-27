import styles from './information.module.css';
import PropTypes from 'prop-types';

const InformationLayout = ({ textInformation }) => (
	<div className={styles.text}>{textInformation}</div>
);

InformationLayout.propTypes = {
	textInformation: PropTypes.string,
};

export const Information = ({ isDraw, isGameEnded, currentPlayer }) => {
	let textInformation = '';
	if (isDraw === true) {
		textInformation = 'Ничья';
	} else if (isGameEnded === true) {
		textInformation = `Победа: ${currentPlayer}`;
	} else {
		textInformation = `Ходит ${currentPlayer}`;
	}
	console.log(textInformation);
	return <InformationLayout textInformation={textInformation} />;
};

Information.propTypes = {
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	currentPlayer: PropTypes.string,
};
