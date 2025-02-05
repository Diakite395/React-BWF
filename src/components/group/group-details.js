import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFetchGroup } from '../../hooks/fetch-group';
import { Send } from 'react-bootstrap-icons';
import { Button, Image, Container, Form } from 'react-bootstrap';
import { joinGroup, leaveGroup, postComment } from '../../services/group-services';
import { useAuth } from '../../hooks/useAuth';
import Comments from '../comments/comments';
import EventList from '../events/event-list';
import { host } from '../../services/config';


function GroupDetails() {

  const { authData } = useAuth()

  const { id } = useParams();

  const navigate = useNavigate();

  const [ data, loading, error ] = useFetchGroup(id)
  const [ group, setGroup ] = useState(null)
  const [ inGroup, setInGroup ] = useState(false)
  const [ isAdmin, setIsAdmin ] = useState(false)
  const [ comment, setComment ] = useState(null)
 
  useEffect(() => {
    // ? devant une variable permet de dire a javascript de faire les operation si seulement la variable est disponible
    // !! permet de convertire le resultat obtenu en boolen 
    if(data?.members){
      if(authData?.user){
        setInGroup(!!data.members.find(member => member.user.id === authData.user.id))
        setIsAdmin(data.members.find(member => member.user.id === authData.user.id)?.admin)
      }
    }
    setGroup(data);
  }, [data])

  async function join(){
    const member = await joinGroup({user: authData.user.id, group: group.id});
    console.log(member)
  }

  async function leave(){
    const member = await leaveGroup({user: authData.user.id, group: group.id});
    console.log(member)
  }
  
  async function addEvent(){
    navigate('/event-form', {state: {group: group}});
  }

  async function send(){
    const msg = postComment(authData.token, authData.user.id, group.id, comment)
  }

  if (error) return (
    <>
      <Link to='../'>back</Link>
      <h1>Error</h1>
    </>
  )


  const liste = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
  let i = 0;
  (
    function load() {

      const timeoutID = setTimeout(() => {
        const elt = document.getElementById('load2');
        if(elt){elt.innerHTML = liste[i];}
        i++;
        
        if(i===4){
          i = 0;
        }

        if(!loading){
          i = 0;
          clearTimeout(timeoutID)
        }

        load()
    
      }, 1000);
    }
  )();

  if (loading) return <h1 id='load2'>Loading</h1>

  return (
    <>
      <Container className='group-detail-container'>
        {group &&
          <div className='infos'>
            <Link to='/'>back</Link>
            <h1>{group.name} : {group.location}</h1>
            <h2>{group.location}</h2>
            <h3>Events:</h3>
            <p>{}</p>
            <EventList events={group.events}/>
            <br/>
            <h3>Members :</h3>
            <div className='members'>
              {group.members.map(member => {

                return <div key={member.id} className='usersCont'>
                  <div className='users'>
                    {member.user.profile?.image ?
                      <Image src={host+member.user.profile.image} roundedCircle fluid width={50}/>
                      :
                      <Image src={`${host}/mediafiles/avatars/avatar.png`} roundedCircle fluid width={50}/>
                    }
                    <h4>{member.user.username}</h4>
                  </div>
                  <p className='points'>{member.points} pts</p>
                </div>
              })}
            </div>
          </div>
        }
        <div className='action'>
          {inGroup ?
            <>
              <Button onClick={leave}>Leave Group</Button>
            </>
            :
            <>
              <Button onClick={join}>Join Group</Button>
            </>
          }
          {isAdmin && <Button onClick={addEvent}>Add Event</Button>}
        </div>
      </Container>
      <hr/>
      <h2>Comments:</h2>
      <br/>
      <div className='msg-box'>
        <Form>
          <Form.Group controlId='formText'>
          <Form.Control as="textarea" rows={2} 
            onChange={e => (setComment(e.target.value))}/>
          </Form.Group>
        </Form>
        <Button onClick={send}>
          Send
          <Send />
        </Button>
      </div>
      <br/>
      <div>
        
      </div>
      {group && 
        <Comments group={group}/>
      }
    </>
  );
}

export default GroupDetails;