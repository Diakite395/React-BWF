import { status } from "../utils";
import {host} from "./config";


export function getEvent(token, id){
  return fetch(`http://${host}:8000/api/events/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
  })
  .then(status).catch(e => console.log(e));
};


export function placeBet(token, eventId, score1, score2){
  return fetch(`http://${host}:8000/api/bets/place_bet/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({
      event: eventId,
      score1: score1,
      score2: score2
    })
})
  .then(status).catch(e => console.log(e));
};


export function AddEvent(token, eventData){
  return fetch(`http://${host}:8000/api/events/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(eventData)
})
  .then(status).catch(e => console.log(e));
};