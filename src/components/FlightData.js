import React, { useState,Fragment, useEffect } from 'react';
import {
    Row,Col,ListGroup,ListGroupItem
  } from 'reactstrap';
import axiosInstance from '../axiosInstance'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,Button
} from 'reactstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import FlightTimeline from './FlightTimeline';
export default function FlightData(props){
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


    const TimeConverter = ({ isoString }) => {
      const convertToTime = (isoString) => {
        const date = new Date(isoString);
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        return date.toLocaleString('en-US', options);
      };
    
      return (
        <span>
          {convertToTime(isoString)}
        </span>
      );
    };

    const MinutesToHours = ({ minutes }) => {
      const convertToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hours and ${remainingMinutes} minutes`;
      };
    
      return (
        <span>
          {convertToHours(minutes)}
        </span>
      );
    };

    return  props.flightData!=null&&props.flightData.itineraries.length>0?<Row>
      <Col md="12">

      <div>
      <ListGroup>
        { props.flightData.itineraries.map((flightlist,index)=>{
          return <div key={index}>
            <ListGroupItem style={{padding:"15px"}}>
            <Row>
                <Col md="1">
                  <img src={flightlist.legs[0].carriers.marketing[0].logoUrl} style={{width:"60%",height:"50px"}}/>
                </Col>
                <Col md="4">
                 <div><TimeConverter isoString={flightlist.legs[0].departure}/> - <TimeConverter isoString={flightlist.legs[0].arrival} /> {flightlist.legs[0].timeDeltaInDays>0?<sup>{flightlist.legs[0].timeDeltaInDays+"+"}</sup>:""}</div>
                 <div style={{fontSize:"12px",color:"grey"}}>{flightlist.legs[0].carriers.marketing[0].name}</div>
                </Col>
                <Col md="3">
                  <div><MinutesToHours minutes={flightlist.legs[0].durationInMinutes} /></div>
                  <div style={{fontSize:"12px",color:"grey"}}>{flightlist.legs[0].origin.displayCode} - {flightlist.legs[0].destination.displayCode}</div>
                </Col>
                <Col md="3">{flightlist.legs[0].stopCount==0?"Non Stop": flightlist.legs[0].stopCount+" Stop" }</Col>
                <Col md="1">
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span>{flightlist.price.formatted}</span>
                    <span style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Button color="link" onClick={() => toggleItem(index)}>
                        {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                      </Button>
                    </span>

              </div>
                </Col>
              </Row>


            </ListGroupItem>
            {openIndex === index && (
              <div className="p-3 border" style={{ backgroundColor: '#f8f9fa' }}>
                <FlightTimeline flightlist={flightlist} flightData={props.flightData} />
              </div>
            )}
          </div>
})}
      </ListGroup>
    </div>
    </Col>
    </Row>:""
}

