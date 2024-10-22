import React from 'react';
import { Card, CardBody, CardTitle, CardText, Badge, ListGroup, ListGroupItem,Row,Col } from 'reactstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const FlightTimeline = (props) => {

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
    
      const calculateTimeDifference = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        // Calculate the difference in milliseconds
        const differenceInMs = endDate - startDate;
    
        // Convert the difference into minutes
        const differenceInMinutes = Math.floor(differenceInMs / 1000 / 60);
    
        // Convert minutes to hours and remaining minutes
        const hours = Math.floor(differenceInMinutes / 60);
        const minutes = differenceInMinutes % 60;
    
        return `${hours} hours and ${minutes} minutes`;
      };
    
  return (
    <div className="timeline">
      {props.flightlist.legs[0].segments.map((sgmt,index)=>{
        return <div>
            {
            index>0? <Row>
                <Col md="1"></Col>
                <Col md="11">
                        {calculateTimeDifference(props.flightlist.legs[0].segments[index-1].arrival,sgmt.departure)} layover in  {sgmt.destination.name+"("+sgmt.destination.displayCode +")"}
                        <hr/>
                </Col>
            </Row>:""
              }
            <Row>
                <Col md="1">
                    <div className="timeline-dot" />
                </Col>
                <Col md="11">

                    <div className="flight-details">
                        <div className="flight-time"><TimeConverter isoString={sgmt.departure}/> {sgmt.origin.name+"("+sgmt.origin.displayCode +")"}</div>
                        <div className="flight-meta">
                            <span>Travel time: <MinutesToHours minutes={sgmt.durationInMinutes} /></span>
                        </div>
                        </div>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                <div className="timeline-line"></div>
                </Col>
            </Row>
            <Row>
                <Col md="1">
                    <div className="timeline-dot" />
                </Col>
                <Col md="11">
                     <div className="flight-details">
                          <div className="flight-time"><TimeConverter isoString={sgmt.arrival}/> {sgmt.destination.name+"("+sgmt.destination.displayCode +")"}</div>
                    </div>
                    <div className='operatorCarrier'>{sgmt.operatingCarrier.name}-{sgmt.flightNumber}</div>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="11"> <hr/></Col>
            </Row>
               

            </div>
      })}



    </div>
  );
};

export default FlightTimeline;
