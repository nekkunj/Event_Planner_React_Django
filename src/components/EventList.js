import React,{useState,useEffect,useRef} from "react";
import { deleteEvent, updateEvent,getEventTypes } from "../api";
import { Gantt ,ContextMenu} from "wx-react-gantt";
import { Willow,WillowDark } from "wx-react-gantt";
import { Toolbar } from "wx-react-gantt";
import {Button} from 'antd'
import "wx-react-gantt/dist/gantt.css";
import "./EventList.css";


const EventList = ({ events, refresh,onEditEvent, onCreateEvent,selectedType,selectedTitle }) => {
  const apiRef = useRef(null);
  const [eventTypes, setEventTypes] = useState([]);
  const colorPalette = ["#3983eb", "#52c41a", "#f4b330", "#ff3e48", "#13c2c2", "#b491f3"];
  const [typeColorMap, setTypeColorMap] = useState({});
  const [taskTypes, setTaskTypes] = useState([]);
  const [selected, setSelected] = useState();
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    const fetchTypes = async () => {
      const { data } = await getEventTypes();

      // const mappedTypes = data.map((type, index) => {
      //   const formattedName = type.name.toLowerCase().replace(/\s+/g, '');
      //   return {
      //     id: formattedName, // this must match task.type
      //     label: type.name,
      //     color: colorPalette[index % colorPalette.length]
      //   };
      // });
    // console.log(mappedTypes)
      const mappedTypes = data.map((type, index) => ({
        id: type.name, // this must match task.type
        label: type.name,
        color: colorPalette[index % colorPalette.length]
      }));
      const map = {};
        data.forEach((type, index) => {
        map[type.name] = colorPalette[index % colorPalette.length];
      });
      setEventTypes(data);
      setTaskTypes(mappedTypes);
      setTypeColorMap(map)
    };
  
    fetchTypes();
    
  }, []);
  
  const convertEventsToTasks = (events, selectedType, searchText) => {
    return events
      .filter((event) => {
        const matchesType =
          selectedType === "all" || event.type === selectedType;
        const matchesSearch =
          !searchText ||
          event.title.toLowerCase().includes(searchText.toLowerCase());
  
        return matchesType && matchesSearch;
      })
      .map((event) => ({
        id: event.id,
        text: event.title,
        start: new Date(event.startDate + "T00:00:00"),
        end: new Date(event.endDate + "T00:00:00"),
        details: event.description,
        duration: Math.ceil(
          (new Date(event.endDate + "T00:00:00") - new Date(event.startDate + "T00:00:00")) /
            (1000 * 60 * 60 * 24)
        ),
        progress: event.progress,
        type: event.type,
        barColor: typeColorMap[event.type] || "#d9d9d9",
        lazy: false,
      }));
  };

  


  const tasks = convertEventsToTasks(events,selectedType,selectedTitle);
 

  const scales = [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1, format: "d" },
  ];
  
  const links = [];;

 

  const columns = [
    {
      id: "text",
      header: "Title",
      align: "left",
      flexgrow: 2,
      sort:true,
    },
    {
      header: "Type",
      id: "type",
      align: "left",
      flexgrow: 1,
      sort:true

    },
    {
      id: "start",
      header: "Start Date",
      align: "center",
      flexgrow: 2,
      sort:true,
      template: (b) => new Date(b).toLocaleDateString('en-CA')
    },
    {
      id: "end",
      header: "End Date",
      align: "center",
      flexgrow: 2,
      sort:true,
      template: (b) => new Date(b).toLocaleDateString('en-CA')
    },
    {
      header: "Duration",
      id: "duration",
      align: "center",
      flexgrow: 1,
    },

  ];

  
  function doClick(ev) {
    const data = ev;
    apiRef.current.exec("update-task", {
      id: data.id,
      task: {
        text:"hello",
        clicked: data.clicked,
      },
    });
  }
 
  const init = (api) => {
    apiRef.current = api;

    api.on("add-task", ({})=>{
      onCreateEvent()
    });


    api.on("update-task", ({ id }) => {
      const ele=api.getTask(id)
      const obj={
        id: ele.id,
        title: ele.text,
        description:ele.details,
        startDate: new Date(ele.start).toISOString().slice(0, 10),
        endDate: new Date(ele.end).toISOString().slice(0, 10),
        progress: ele.progress,
        type: ele.type ,
        // barColor: typeColorMap[event.type] || "#d9d9d9",  // fallback gray
      }
      updateEvent(id,obj)
      // console.log("updating id:", id);
      // console.log(api.getTask(id))
    });
    
    api.on("delete-task", ({ id,source }) => {
      deleteEvent(id)
    });

    api.on("move-task", ({ id, source, inProgress }) => {
      if (inProgress) return;
      // console.log(id,source,inProgress)
      // if (api.getTask(id).parent !== source) recalcSummaryProgress(source, true);
      // recalcSummaryProgress(id);
    });

    
};
  const items = [
    {
      id: "add-task",
      comp: "button",
      icon: "wxi-plus",
      text: "Add task",
      type: "primary",
    },
    {
      id: "edit-task",
      comp: "button",
      icon: "wxi-edit",
      text: "edit",
      type: "link",
    },
  ];
  // const editorShape = [
  //   {
  //     key: "Text",
  //     type: "text",
  //     label: "Name",
  //     config: {
  //       placeholder: "Task name",
  //       focus: true,
  //     },
  //   },
  // ];
  
  return( 
          <div className="demo">
            <div style={{ margin: "10px 0" }}>
              {taskTypes.map(t => (
                <span key={t.id} style={{ marginRight: 15 }}>
                  <span style={{
                    backgroundColor: t.color,
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    marginRight: 5
                  }} />
                  {t.label}
                </span>
              ))}
            </div>
            {/* {taskTypes &&  tasks && tasks.length>0 && ( */}
            {/* <Toolbar api={apiRef.current} items={items} /> */}
              <Willow>
                <Gantt
                init={init}
                  apiRef={apiRef}
                  tasks={tasks} 
                  links={links} 
                  zoom={true}
                  scales={scales} 
                  taskTypes={taskTypes}
                  viewMode="month"
                  cellWidth={60}
                  cellHeight={42}
                  showGrid 
                  columns={columns}
                  onCustomClick={doClick}
                  scaleHeight={40} 
                  // editorShape={editorShape}
                  // onShowEditor={clearTaskText}
                  // form={null}
                />
                </Willow>
            {/* )} */}
          </div>
        );
};

export default EventList;
