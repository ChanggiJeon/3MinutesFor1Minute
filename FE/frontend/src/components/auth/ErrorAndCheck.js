import { FiCheck } from 'react-icons/fi';
import { IoWarningOutline } from 'react-icons/io5';
import ConfirmMsg from './ConfirmMsg';
import EmptyMsg from './EmptyMsg';
import ErrorMsg from './ErrorMsg';

function ErrorAndCheck(message, check = false) {
	if (message) {
		return (
			<ErrorMsg>
				<IoWarningOutline />
				{message}
			</ErrorMsg>
		);
	}
	if (check) {
		return (
			<ConfirmMsg>
				<FiCheck />
				확인되었습니다.
			</ConfirmMsg>
		);
	}
	return <EmptyMsg />;
}

export default ErrorAndCheck;
