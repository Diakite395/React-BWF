import { status } from "../utils";
import {host} from "./config";

export function getGroups(){
  return fetch(`${host}/api/groups/`)
  .then(status).catch(e => console.log(e));
};

export function getGroup(id){
  return fetch(`${host}/api/groups/${id}`)
  .then(status).catch(e => console.log(e));
};

export function joinGroup(data){
  return fetch(`${host}/api/members/join/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(status).catch(e => console.log(e));
};

export function leaveGroup(data){
  return fetch(`${host}/api/members/leave/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(status).catch(e => console.log(e));
};

export function postComment(token, user, group, description){
  return fetch(`${host}/api/comment/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({user, group, description})
  })
  .then(status).catch(e => console.log(e));
};
