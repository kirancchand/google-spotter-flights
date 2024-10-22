import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import {Container,Row,Col,Card,CardBody,Button,ListGroup,ListGroupItem} from 'reactstrap';
import googlefli from './assets/df.png';
import FlightSearch from './components/FlightSearch'
import ResponseContent from './components/ResponseContent'
import RecommendedPlaces from './components/RecommendedPlaces'
import FlightData from './components/FlightData'
import axiosInstance from './axiosInstance'
import BeatLoader from "react-spinners/BeatLoader";
function App() {
const [flightLoader,setFlightLoader]=useState(false);
const [flightData,setFlightData]=useState(null);

const flightResp=async (data)=>{
  setFlightLoader(true)
  try {
    const response = await axiosInstance.get('/v2/flights/searchFlights', { params: data });
    setFlightData(response.data.data)
    setFlightLoader(false)
  } catch (error) {
    setFlightLoader(false)
    console.error('Error fetching flight data:', error);
  }
}
  return (
    <div>
      <Container>
        <Row>
          <Col md="12">
            <img src={googlefli} width="100%" height="350px"/>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className='custom-shadow'>
              <CardBody>
                 <FlightSearch flightResp={(data)=>flightResp(data)}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col md="12">
              {!flightLoader?<FlightData flightData={flightData}/>:<BeatLoader/>}
          </Col>
        </Row>
        <Row className='mt-5'> 
          <Col md="12">
                <ResponseContent/>
                <br/>
                <RecommendedPlaces/>
          </Col>
        </Row>

      </Container>
    </div>

  );
}

export default App;
