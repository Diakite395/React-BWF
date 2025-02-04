import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getGroups } from '../../services/group-services';


function GroupList() {

  const [groups , setGroups] = useState(null)
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const data = await getGroups();
        setGroups(data);

      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  
  (
    function () {

      const liste = ['Loading.', 'Loading..', 'Loading...'];
      let i = 0;

      const intervalID = setInterval(() => {
        const elt = document.getElementById('load');
        if(elt){elt.innerHTML = liste[i];}
        i++;
        if(i===3){
          i = 0;
        }
      }, 1000); 
      
      if(!loading){
        i = 0;
        clearInterval(intervalID)
      }
    }
  )();
  
  
  if (error) return <h1>Error</h1>
  if (loading) return <h1 id='load'>Loading</h1>
  

  return (
    <div className='groups'>
      {groups &&
        groups.map((group) => {
          return group.id && group.name && group.location ? (
            <Link key={group.id} to={`../details/${group.id}`}>
              <p> {group.name}: {group.location}</p>
            </Link>
          ) : null;
        })}
    </div>
  );
}

export default GroupList;
