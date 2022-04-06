import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import styled from 'styled-components';
import dayjs from 'dayjs';
import routes from '../../../routes';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import MainBox from '../../../components/community/minutes/list/MainBox';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import { fetchMinutesByComId } from '../../../store/minutes';
import HeaderBox from '../../../components/community/HeaderBox';
import MinutesPagination from './MinutesPagination';

import MinutesItem from '../../../components/community/minutes/list/MinutesItem';
import NumBox from '../../../components/community/minutes/list/textBox/NumBox';
import TitleBox from '../../../components/community/minutes/list/textBox/TitleBox';
import DateBox from '../../../components/community/minutes/list/textBox/DateBox';
import AuthorBox from '../../../components/community/minutes/list/textBox/AuthorBox';
import DeadlineBox from '../../../components/community/minutes/list/textBox/DeadlineBox';

function MinutesCalender() {
	const { communityId } = useParams();
	const dispatch = useDispatch();
	const now = dayjs()
	const [events, setEvents] = useState([]);
	const location = useLocation();

	useEffect(() => {
		dispatch(fetchMinutesByComId(communityId)).then(({payload})=>{
			const events = [];
			payload.map(event => {
				const a = {
					event_id: event.id,
					title: event.title,
					start: new Date(event.created_at),
					end: new Date(event.deadline),
				}
				events.push(a)
				return event
			});
			console.log(events);
			setEvents([events]);
		});
	}, [location]);
	
	return (
		<Scheduler
			view='week'
			events={
				events
			}
			selectedDate={new Date(now)}
		/>
	);
}

export default MinutesCalender;
