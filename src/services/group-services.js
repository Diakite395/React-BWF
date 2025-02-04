import { status } from "../utils";
import {host} from "./config";

export function getGroups(){
  return fetch(`http://${host}:8000/api/groups/`)
  .then(status).catch(e => console.log(e));
};

export function getGroup(id){
  return fetch(`http://${host}:8000/api/groups/${id}`)
  .then(status).catch(e => console.log(e));
};

export function joinGroup(data){
  return fetch(`http://${host}:8000/api/members/join/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(status).catch(e => console.log(e));
};

export function leaveGroup(data){
  return fetch(`http://${host}:8000/api/members/leave/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(status).catch(e => console.log(e));
};

export function postComment(token, user, group, description){
  return fetch(`http://${host}:8000/api/comment/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({user, group, description})
  })
  .then(status).catch(e => console.log(e));
};
