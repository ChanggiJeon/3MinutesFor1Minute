import { useEffect } from 'react';

function RecordPlayer({ audioURL }) {
	// useEffect(() => {}, [audioURL]);
	// eslint-disable-next-line jsx-a11y/media-has-caption
	return <audio controls src={audioURL} />;
}

export default RecordPlayer;
