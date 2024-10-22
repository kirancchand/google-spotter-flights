import React, { useState,Fragment } from 'react';
import {
  Row,Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from 'reactstrap';
import { FaMapMarkerAlt, FaSyncAlt, FaSearch,FaExchangeAlt,FaUserAlt,FaRegCircle,FaCheck } from 'react-icons/fa';
import {
  RangeDatePicker,
  SingleDatePicker
} from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SelectLocationSource from './SelectLocationSource';
import SelectLocationDestination from './SelectLocationDestination';
import PersonType from './PersonType';
import axiosInstance from '../axiosInstance'
import {flightDataJson} from '../common/sample';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const FlightSearch = (props) => {
  const [tripTypeOpen, setTripTypeOpen] = useState(false);
  const [passengerOpen, setPassengerOpen] = useState(false);
  const [classTypeOpen, setClassTypeOpen] = useState(false);

  const [tripType, setTripType] = useState('Round trip');
  const [passengers, setPassengers] = useState({
    adults:1,
    childrens:0,
    infants:0
  });
  const classTypeData=[
    {value:"economy",label:"Economy"},
    {value:"premium_economy",label:"Premium Economy"},
    {value:"business",label:"Business"},
    {value:"first",label:"First"},
];

  const [classType, setClassType] = useState({value:"economy",label:"Economy"});

  const toggleDropdown = () => {setTripTypeOpen(!tripTypeOpen)};
  const togglePassengerDropdown = () => setPassengerOpen(!passengerOpen);
  const toggleClassType = () => setClassTypeOpen(!classTypeOpen);
  const [source,setSource]=useState(null);
  const [destination,setDestination]=useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

 
  const selectedLoc=(data,type)=>{
    if(type=="source"){
      setSource(data)
    }else{
      setDestination(data)
    }
  }




  const handleSearch=()=>{

    if(source==null||destination==null){
      toast.error('Error!! Please Select Source and Destination', {position: 'top-right'});
    }else if((tripType=="Round trip")?(startDate==null&&endDate==null):(startDate==null)){
      toast.error('Error!! Please Select Date', {position: 'top-right'});
    }
    else{
      let reqData={
        originSkyId:source.navigation.relevantFlightParams.skyId,
        destinationSkyId: destination.navigation.relevantFlightParams.skyId,
        originEntityId: source.navigation.relevantFlightParams.entityId,
        destinationEntityId: destination.navigation.relevantFlightParams.entityId,
        cabinClass: classType.value,
        adults: passengers.adults,
        childrens:passengers.childrens,
        infants:passengers.infants,
        date:startDate,
        returnDate:endDate,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      }
      props.flightResp(reqData)
    }

  }
const onDateRangeChange=(start, end)=>{
  const formattedStartDate = start ? format(new Date(start), 'yyyy-MM-dd') : null;
  const formattedEndDate = end ? format(new Date(end), 'yyyy-MM-dd') : null;
  setStartDate(formattedStartDate);
  setEndDate(formattedEndDate);
}
const onDateSingleChange=(start)=>{
  const formattedStartDate = start ? format(new Date(start), 'yyyy-MM-dd') : null;
  setStartDate(formattedStartDate);
}



  return (
    <Form >
      <Row>
        <Col md="12" className="fs-col">
          <FormGroup className='row1-margin'>
          <ButtonDropdown isOpen={tripTypeOpen} toggle={toggleDropdown}>
              <DropdownToggle
                data-toggle="dropdown"
                tag="span"
                caret
              >
                <FaExchangeAlt className="ml-1" />&nbsp;&nbsp;
            {tripType}&nbsp;
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setTripType('Round trip')}>Round trip</DropdownItem>
              <DropdownItem onClick={() => setTripType('One way')}>One way</DropdownItem>
            </DropdownMenu>
              </ButtonDropdown>
           </FormGroup>


          <FormGroup className='row1-margin'>
            &nbsp;&nbsp;&nbsp;
          <ButtonDropdown isOpen={passengerOpen} toggle={togglePassengerDropdown}>
              <DropdownToggle
                data-toggle="dropdown"
                tag="span"
                caret
              >
                <FaUserAlt className="ml-1" />&nbsp;&nbsp;
            {passengers.adults+passengers.childrens+passengers.infants}&nbsp;
            </DropdownToggle>
            <DropdownMenu className="fs-menu">
                <div className='fs-menu-div'>
                   <PersonType type="Adults" passengers={passengers} setPassengers={setPassengers}/>
                   <PersonType type="Children" passengers={passengers} setPassengers={setPassengers}/>
                   <PersonType type="Infants" passengers={passengers} setPassengers={setPassengers}/>
                </div>
            </DropdownMenu>
              </ButtonDropdown>
           </FormGroup>
           &nbsp;&nbsp;&nbsp;
          <FormGroup>
          <ButtonDropdown isOpen={classTypeOpen} toggle={toggleClassType}>
              <DropdownToggle
                data-toggle="dropdown"
                tag="span"
                caret
              >
            {classType.label}&nbsp;
            </DropdownToggle>
            <DropdownMenu className='fs-menu-foritem'>
              {
                classTypeData.map((classTypedata)=>{
                        return <DropdownItem onClick={() => setClassType(classTypedata)} >{classType.value==classTypedata.value?<FaCheck/>:""}<span style={{marginLeft:"5px"}}>{classTypedata.label}</span></DropdownItem>
                })
              }
              
            </DropdownMenu>
              </ButtonDropdown>
           </FormGroup>

        </Col>
      </Row>
      <Row>
        <Col md="6"
         className="d-flex justify-content-center align-items-center"
         >
                <div className="position-relative mx-1">
                    <SelectLocationSource type="source" selectedLoc={(data)=>selectedLoc(data,"source")}/>
                </div>
                <div className="position-relative icon-bwn-sd">
                    <div className="sync-icon-wrapper">
                    <FaSyncAlt className="sync-icon" />
                    </div>
                  </div>
                  <div className="position-relative mx-1">
                    <SelectLocationDestination type="destination" selectedLoc={(data)=>selectedLoc(data,"destination")}/>
                  </div>
        </Col>
        <Col md="6">
        {
        tripType=="Round trip"?
          <RangeDatePicker
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                startDatePlaceholder="Departure"
                endDatePlaceholder="Return"
                onChange={(startDate, endDate) => onDateRangeChange(startDate, endDate)}
                
              />
          :
            <SingleDatePicker
              minDate={new Date()}
              startDate={startDate}
              monthFormat="MMM YYYY"
              startDatePlaceholder="Date"
              disabled={false}
              className="my-own-class-name"
              startWeekDay="monday"
              onChange={(startDate) => onDateSingleChange(startDate)}
            />
        }
        </Col>
      </Row>
      <div style={{position:"relative",top:"35px"}}>
      <div className='d-flex justify-content-center align-items-center'>
      <Button color="primary" className="ml-2 custom-shadow" style={{ borderRadius: 50,padding:"0 20px" }} onClick={()=>handleSearch()}>
          <FaSearch /> Explore
        </Button>
      </div>
      </div>
      <ToastContainer />
  </Form>
  );
};

export default FlightSearch;
