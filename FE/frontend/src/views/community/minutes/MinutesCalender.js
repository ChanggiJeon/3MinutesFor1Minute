import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "@emotion/styled";
import { fetchMinutesByComId } from '../../../store/minutes';


export const StyleWrapper = styled.div`
  .fc {
	margin : 20px;
  }
  .fc-toolbar{
	  padding-left : 45%;
  }
  .fc-event-main-frame .fc-daygrid-dot-event{
	flex-direction: row-reverse;
  }
  .fc-daygrid-event-dot{
	display:none;
  }
  .fc-event-time{
	display:none;
  }
  .fc-event-title{
	  text-align: center;
	  background-color: #537791;
	  color: var(--fc-event-text-color, #fff);
  }
	.fc-event-title:hover{
		text-align: center;
		font-size: 15px;
		cursor: pointer
	}

  .fc-event-title-container{
	text-align: center;
  }
  .fc-event-title-container:hover{
	text-align: center;
	cursor: pointer
  }

`

function MinutesCalender() {
	const { communityId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const now = dayjs()
	const [events, setEvents] = useState([]);
	const location = useLocation();

	useEffect(() => {
		dispatch(fetchMinutesByComId(communityId)).then(({payload})=>{
			const events = [];
			payload.map(event => {
				const a = {
					id: event.id,
					title: event.title,
					start: event.created_at,
					end: event.deadline,
				}
				events.push(a)
				return event
			});
			setEvents(events);
		});
	}, [location]);
	
	return (
		<div className="App">
			<StyleWrapper>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={events}
					eventColor='#537791'
					nowIndicator
					eventClick={(e) => navigate(`/community/${communityId}/minutes/${e.event._def.publicId}`)}
				/>
			</StyleWrapper>
		</div>
	);
}

export default MinutesCalender;
