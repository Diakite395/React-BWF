import React from 'react';
import GroupList from '../group/group-list';
import GroupDetails from '../group/group-details';
import { Routes, Route } from 'react-router-dom';
import Account from '../user/account';
import { Sigin } from '../user/sigin';
import { Login } from '../user/login';
import { Container } from 'react-bootstrap';
import Event from '../events/event';
import EventForm from '../events/event-form';
import ProtectedRoutes from '../../hooks/protectedRoutes';


function Main() {
  return (
    <Container className='main-container'>
      <div className='main'>
        <Routes future={{ v7_relativeSplatPath: true, }}>

          {/* Protected Routes see src/components/hooks/protectedRoutes.js */}
          <Route element={<ProtectedRoutes/>}>
            <Route exact path="/event-form" element={<EventForm />} />
            <Route exact path="/account" element={<Account />} />
            <Route path="/event">
    +         <Route path=":id" element={<Event />} />
    +       </Route>
          </Route>

          <Route exact path="/" element={<GroupList />} />
          <Route exact path="/sigin" element={<Sigin />} />
          <Route exact path="/login" element={<Login />} />
          
          <Route path="details">
  +         <Route path=":id" element={<GroupDetails />} />
  +       </Route>

        </Routes>
      </div>
    </Container>
  );
}

export default Main;
