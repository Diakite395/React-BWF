import React from "react";
import { DateTime } from 'luxon';
import { Calendar2Day, Alarm, } from 'react-bootstrap-icons';
import {  Link, useParams } from "react-router-dom";
import { useFetchEvent } from "../../hooks/fetch-event";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Form, Image, Button } from "react-bootstrap";
import { placeBet } from "../../services/event-services";
import { host } from "../../services/config";


export default function Event(){

  const { id } = useParams();

  const { authData } = useAuth();

  const [ score1, setScore1 ] = useState();
  const [ score2, setScore2 ] = useState();

  const [ event, setEvent ] = useState(null);
  const [ eventData, loading, error ] = useFetchEvent(authData?.token, id);


  useEffect(()=>{
    setEvent(eventData);
  }, [eventData])


  const sendBet = async () => {
    const bet = await placeBet(authData.token, event.id, score1, score2);

    if(bet){
      if(bet.new){
        const updateEventData = {...eventData, bets: [...eventData.bets, bet.result]};
        setEvent(updateEventData);

      } else {
        const betIndex = event.bets.findIndex( elt => elt.user.id === bet.result.user.id);
        event.bets[betIndex] = bet.result;

        setScore1('');
        setScore2('');
      }
    }

  }


  const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
  let evtTime;

  if(event?.time){
    evtTime = DateTime.fromFormat(event.time, format);
  }

  if(loading){<h1>loading</h1>}
  if(error){<h1>Error</h1>}

  return (
    <>
      <Link to= {`/details/${event?.group}`} >back</Link>
      {event && 
        <div key={event.id}>
          <h1>{event.team1} VS {event.team2}</h1>
          { event.score1 >= 0 && event.score2 >= 0 && <h2>{event.score1} - {event.score2}</h2> }
          <p className='time'>
            <Calendar2Day 
              iconName="Calendar2Day"
              color="#0d6efd"
              size={20}
              className="align-center"
            />
            {evtTime.toSQLDate()} <Alarm 
              iconName="Alarm"
              color="#0d6efd"
              size={20}
              className="align-center"
            />
            {evtTime.toFormat('HH:mm')}
          </p>
        </div>
      }
      <br/>
      <hr /> {/* <div style={{ borderLeft: "2px solid #0d6efd", height: "100px", margin: "20px 0" }}></div> */}
      { event && event.bets && event.bets.map(bet => {
        return(
          <div key={bet.id} className='bet'>
            <div className='users'>
              {bet.user.profile?.image ?
                <Image src={host+bet.user.profile.image} roundedCircle fluid width={50}/>
                :
                <Image src={`${host}/mediafiles/avatars/avatar.png`} roundedCircle fluid width={50}/>
              }
              <h4>{bet.user.username}</h4>
            </div>
            <h2>{bet.score1} - {bet.score2}</h2>
            <h2>{bet.points} pts</h2>
          </div>
        )
      })}
      <hr/>
      <Form>
        <Form.Group controlId='number'>
          <Form.Label>{event?.team1}</Form.Label>
          <Form.Control style={{weight:"90px"}} type='number' placeholder={0}
          onChange={e => (setScore1(e.target.value))}/>
        </Form.Group>

        <Form.Group controlId='number'>
          <Form.Label>{event?.team2}</Form.Label>
          <Form.Control type='number' placeholder={0}
          onChange={e => (setScore2(e.target.value))}/>
        </Form.Group>
      </Form>
      <Button onClick={sendBet} disabled={!score1 || !score2}>Place Bet</Button>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  )
}