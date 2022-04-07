import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsAlarmFill } from 'react-icons/bs';
import TextTitle from '../../../common/TextTitle';

const StyledTimer = styled(TextTitle)`
	display: flex;
	align-items: center;
	font-size: 54px;
	color: ${props => props.theme.timerColor};
`;

const Alarm = styled(BsAlarmFill)`
	margin: 0 20px;
`;

function Timer({ status, saveRecording }) {
	const [minutes, setMinutes] = useState(parseInt(3, 10));
	const [seconds, setSeconds] = useState(parseInt(0, 10));

	useEffect(() => {
		const countdown = setInterval(() => {
			if (status === 'recording') {
				if (parseInt(seconds, 10) > 0) {
					setSeconds(parseInt(seconds, 10) - 1);
				}
				if (parseInt(seconds, 10) === 0) {
					if (parseInt(minutes, 10) === 0) {
						saveRecording();
						clearInterval(countdown);
					} else {
						setMinutes(parseInt(minutes, 10) - 1);
						setSeconds(59);
					}
				}
			} else if (status === 'stopped') {
				setSeconds(parseInt(0, 10));
				setMinutes(parseInt(3, 10));
			}
		}, 1000);
		return () => clearInterval(countdown);
	}, [minutes, seconds, status]);

	return (
		<StyledTimer>
			<Alarm />
			{minutes} : {seconds < 10 ? `0${seconds}` : seconds}
		</StyledTimer>
	);
}

export default Timer;
