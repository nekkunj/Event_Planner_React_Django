import React, { useEffect, useState } from "react";
import { getEvents } from "./api";
import {Button} from 'antd'
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

const App = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); 

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await getEvents();
    setEvents(data);
  };
  const openCreateModal = () => {
    setEditingEvent(null);
    setVisible(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setVisible(true);
  };



  return (
    <div style={{ padding: "20px" }}>
      <h1>📅 Event Planner</h1>
      <Button type="primary" onClick={() => setVisible(true)}>
        + Create Event
      </Button>
      {visible && <EventForm refresh={fetchEvents} onAdd={fetchEvents} visible={visible} disablevisible={()=>{setVisible(false)}}/>}
      <hr />
      <EventList events={events} refresh={fetchEvents} onEditEvent={openEditModal} onCreateEvent={openCreateModal} initialValues={editingEvent}/>
    </div>
  );
};

export default App;
