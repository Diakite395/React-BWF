import { status } from "../utils";
import {host} from "./config";


export async function auth(userData){
  return await fetch(`http://${host}:8000/api/authenticate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(status).catch(e => console.log(e))
}


export async function register(userData){
  return await fetch(`http://${host}:8000/api/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(status).catch(e => console.log(e))
}


export async function changePassword(userID, token, data){
  return await fetch(`http://${host}:8000/api/user/${userID}/change_pass/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(data)
  }).then(status).catch(e => console.log(e))
}


export async function uploadAvatar(profileID, data, token){
  return await fetch(`http://${host}:8000/api/profile/${profileID}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: data
  }).then(status).catch(e => console.log(e))
}
    
  