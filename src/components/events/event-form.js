import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AddEvent } from "../../services/event-services";

export default function EventForm(){

  const location = useLocation();
  
  const { authData } = useAuth()
  const {group} = location.state || {};

  const navigate = useNavigate();

  const [ team1, setTeam1 ] = useState()
  const [ team2, setTeam2 ] = useState()
  const [ time, setTime ] = useState()

  const createEvent = async () => {
    const event = AddEvent(authData.token, {team1, team2, time, group:group.id})
    // console.log(team1);
    // console.log(team2);
    // console.log(time);
    console.log(event);
  }

  if (!group) {
    return (
      <>
        <Link onClick={()=> navigate(-1)}>Back</Link>
        <h1>Erreur : Aucun groupe trouvé ou état non défini.</h1>
      </>
    )
  }

  return (
    <>
      <Link onClick={()=> navigate(-1)}>Back</Link>
      <div className="event-form">
        <h1>Create New Event</h1>
        <br/>
        <Form>
          <div className="team-form">
            <Form.Group controlId='number'>
              <Form.Label>Team1</Form.Label>
              <Form.Control style={{weight:"90px"}} type='text' placeholder='Team1'
              onChange={e => (setTeam1(e.target.value))}/>
            </Form.Group>
            <Form.Group controlId='number'>
              <Form.Label>Team2</Form.Label>
              <Form.Control type='text' placeholder='Team2'
              onChange={e => (setTeam2(e.target.value))}/>
            </Form.Group>
          </div>
          <br/>
          <div className="date-button">
            <Form.Group>
              <Form.Label>Date and Time</Form.Label>
              <Form.Control type='datetime-local' name="event-time"
              onChange={e => (setTime(e.target.value))}/>
            </Form.Group>
          </div>
        </Form>
        <br/>
        <Button onClick={createEvent}>Add Event</Button>
      </div>
    </>
  ) 
}