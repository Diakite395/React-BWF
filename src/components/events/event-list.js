import React from "react";
import { DateTime } from 'luxon';
import { Calendar2Day, Alarm, } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function EventList({events}){

  const navigate = useNavigate();

  const { authData } = useAuth();

  const openEvent = eventId => {
    navigate(`/event/${eventId}`);

    // if(authData){
    //   navigate(`/event/${eventId}`);
    // } else{
    //   navigate('/login');
    // }
  }

  return (
    <>
      {events.map(event => {
        const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
        const evtTime = DateTime.fromFormat(event.time, format);

        return <div key={event.id} onClick={() => openEvent(event.id)} className="event">
          <p>{event.team1} VS {event.team2}</p>
          <p className='time'>
            <Calendar2Day 
              iconName="Calendar2Day"
              color="#0d6efd"
              size={20}
              className="align-center"
            />
            &nbsp;
            {evtTime.toSQLDate()} <Alarm 
              iconName="Alarm"
              color="#0d6efd"
              size={20}
              className="align-center"
            />
            {evtTime.toFormat('HH:mm')}
          </p>
        </div>
      })}
    </>
  )
}