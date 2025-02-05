import { DateTime } from 'luxon';
import React from 'react';
import { Image } from 'react-bootstrap';
import { host } from '../../services/config';


function Comment({comment, user}) {
  const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
  const evtTime = DateTime.fromFormat(comment.time, format);

  return (
    <div className='comment'>
      <div className='users'>
        {user.profile?.image ?
          <Image src={host+user.profile?.image} roundedCircle fluid width={50}/>
          :
          <Image src={`${host}/mediafiles/avatars/avatar.png`} roundedCircle fluid width={50}/>
        }
        <h4>{user.username}</h4>
      </div>
      <div className='time-comment'>
        <p className='comt'>{ comment.description }</p>
        <p className='time'>              
          { comment.time.split('T')[0] } { comment.time.split('T')[1].substring(0, 8) }
        </p>
      </div>
    </div>
  );
}

export default Comment;