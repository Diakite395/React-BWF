import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { host } from '../../services/config';


export default function User({user}) {

  return (
    <>
      <Link to="/account">
      {user.profile?.image ?
        <Image src={host+user.profile.image} roundedCircle fluid width={80}/>
        :
        <Image src={`${host}/mediafiles/avatars/avatar.png`} roundedCircle fluid width={80}/>
      }
      </Link>
      <h3>{user.username}</h3>
    </> 
  );
}

User.prototype = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      image: PropTypes.string
    }).isRequired
  }).isRequired,
  
  
}
