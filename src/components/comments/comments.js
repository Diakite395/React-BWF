import React from 'react';
import Comment from './comment';


function Comments({group}) {

  function findUser(id){
    return group.members.find(member => member.user.id === id)?.user
  }
  return (
    <div className='comments'>
      {group.comments && 
        group.comments.map(comment => {
          return <Comment comment={comment} user={findUser(comment.user)}/>
        })
      }
    </div>
  );
}

export default Comments;
