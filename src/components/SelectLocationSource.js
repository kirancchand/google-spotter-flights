import React, { useState,Fragment,useEffect,useRef } from 'react';
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
import { FaMapMarkerAlt, FaSyncAlt, FaSearch,FaExchangeAlt,FaUserAlt,FaRegCircle,FaPlus } from 'react-icons/fa';
import { BsAirplaneFill } from "react-icons/bs";
import axios from "axios";

import {getNearestAirport} from '../api';
import axiosInstance from '../axiosInstance';
import BeatLoader from "react-spinners/BeatLoader";
export default function SelectLocationSource(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationByDefault,setLocationByDefault]=useState(true);
    const inputRef = useRef(null);

  const [locationData,setLocationData]=useState(null);
    // const toggle = () => setDropdownOpen((prevState) => !prevState);
    
    const toggle = () => {
      setDropdownOpen(!dropdownOpen);  
      // Focus the input field when the dropdown is opened
      if (!dropdownOpen) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0); // Ensure focus after the dropdown is fully rendered
      }
    };

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
      });
    
        const [sourceLoader,setSourceLoader]=useState(false)
        const fetchAirportsData = async (reqData) => {   
          setSourceLoader(true)
          try {
            const response = await axiosInstance.get('/v1/flights/getNearByAirports', { params: reqData });
            setLocationData(response.data.data)
            setSourceLoader(false)
            props.selectedLoc(response.data.data.current)
          } catch (error) {
            setSourceLoader(false)
            console.error('Error fetching airports data:', error);
          }
        };
    
 
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => {
              setLocation({
                latitude: null,
                longitude: null,
                error: error.message,
              });
            }
          );
        } else {
          setLocation({
            latitude: null,
            longitude: null,
            error: 'Geolocation is not supported by this browser.',
          });
        }
        
      }, []); 


      useEffect(()=>{
        if(location.latitude!==null&&location.longitude!==null){
          fetchAirportsData({
            lat: location.latitude,
            lng: location.longitude,
            locale: 'en-US',
          })
        }

      },[location])

      const handleLocation=(loc)=>{
        setSearchTerm(loc.presentation.suggestionTitle)
        props.selectedLoc(loc)
      }

      const searchAirportsData = async (reqData) => {   
        setSourceLoader(true)
        try {
          const response = await axiosInstance.get('/v1/flights/searchAirport', { params: reqData });
          setLocationData(response.data.data)
          setSourceLoader(false)
        } catch (error) {
          setSourceLoader(false)
          console.error('Error fetching airports data:', error);
        }
      };

      const setSearchTermClick=(que)=>{

        setSearchTerm(que)
        if(que!=""){
          setLocationByDefault(false)
          searchAirportsData({
            query: que,
            locale: 'en-US'
          })
        }else{
          setLocationData(null)
          setLocationByDefault(true)
        }

      }

    const DropdownItemDiv=({location,index})=>{
      return <DropdownItem key={index} className="source-item" onClick={()=>handleLocation(location)}>
        <Row>
          <Col md="1">
            <BsAirplaneFill/>
          </Col>
          <Col md="11">
          <div>
            <strong>{ location.presentation.suggestionTitle}</strong>
          </div>
          <div>
            <small>City in {location.presentation.subtitle}</small>
          </div>
          </Col>
        </Row>
        
      </DropdownItem>
    }
    return <Dropdown isOpen={dropdownOpen} toggle={toggle} 
    className="input-with-icon"
    >
    <DropdownToggle 
        tag="div"
        className='toggle-icon'
    >
        <div className='source-tog-icon'>
         {<FaRegCircle className="input-icon-toggle"/> }
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
              {searchTerm!=""? searchTerm:!sourceLoader?locationData!==null?locationData.current.presentation.title:"Source":<BeatLoader/>}
              </span>
              </div>

      
    </DropdownToggle>
    <DropdownMenu style={{
        top:"-40px !important",
        width:"500px"
    }}
    >
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            alignItems:'center',
            margin:"0 20px",
            top:"10px"
        }}>

            <FaRegCircle /> 
            
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    innerRef={inputRef} 
                    type="text"
                    placeholder="Search location"
                    value={searchTerm}
                    onChange={(e) => setSearchTermClick(e.target.value)}
                    className="no-border-on-focus"
                />
                <FaPlus />

        </div>


          <hr />
          {
          locationByDefault?!sourceLoader?locationData!=null&&<DropdownItem style={{height:"50px"}}>
            <Row>
              <Col md="1">
              <FaMapMarkerAlt />
              </Col>
              <Col md="11">
              <div>
                <strong>{ locationData.current.presentation.title}</strong>
                <div><small>City in {locationData.current.presentation.subtitle}</small></div>
              </div>

              </Col>
            </Row>

        </DropdownItem>:<BeatLoader/>:""}
        <br />

        {
          !sourceLoader?locationByDefault?locationData!=null&&locationData.nearby.map((location, index) => (
            <DropdownItemDiv location={location} index={index}/>
            )):locationData.map((location, index) => (
              <DropdownItemDiv location={location} index={index}/>
            )):<BeatLoader/>
        }
    </DropdownMenu>
  </Dropdown>

}