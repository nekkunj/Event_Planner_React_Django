import React, { useEffect, useState } from "react";
import { getEvents } from "./api";
import {Button,Select,Input} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

const App = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); 
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' }); // e.g., "Apr"
  
  
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
    <div style={{ padding: "20px",height:'100vh' }}>
      <h1 style={{ fontWeight: 700, fontSize: "32px", marginBottom: 10, display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          backgroundColor: "lightyellow",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}>
          <div style={{ fontSize: "12px", lineHeight: "12px",color:'black',backgroundColor:'#ae9a0a',width:'100%',display:'flex',justifyContent:'center' }}>{month.toUpperCase()}</div>
          <div style={{ fontSize: "20px", lineHeight: "20px",color:'black', }}>{day}</div>
        </div>
        Event Planner
      </h1>
      <Button type="primary" onClick={() => setVisible(true)} icon={<PlusOutlined />} >
        Create Event
      </Button>
      
      {visible && <EventForm refresh={fetchEvents} onAdd={fetchEvents} visible={visible} disablevisible={()=>{setVisible(false)}}/>}
      <hr />
      <EventList events={events} refresh={fetchEvents} onEditEvent={openEditModal} onCreateEvent={openCreateModal} initialValues={editingEvent}/>
    </div>
  );
};

export default App;
