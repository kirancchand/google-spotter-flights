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
import axiosInstance from '../axiosInstance'
import BeatLoader from "react-spinners/BeatLoader";

export default function SelectLocationDestination(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

  const [locationData,setLocationData]=useState([]);
    // const toggle = () => setDropdownOpen((prevState) => !prevState);
    

      const inputRef = useRef(null);
      const [sourceLoader,setSourceLoader]=useState(false)
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
          searchAirportsData({
            query: que,
            locale: 'en-US'
          })
        }

      }
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

      
    return <Dropdown isOpen={dropdownOpen} toggle={toggle} 
    className="input-with-icon"
    >
    <DropdownToggle 
        tag="div"
        className='toggle-icon'
    >
        <div style={{display:"flex",justifyContent:"flex-start"}}>
         <FaMapMarkerAlt className="input-icon-toggle"/> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{width:"100%"}}>
                
              {searchTerm || "Destination"}
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

            <FaMapMarkerAlt />
            
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    innerRef={inputRef} 
                    type="text"
                    id="searchlocation"
                    placeholder="Search location"
                    value={searchTerm}
                    onChange={(e) => setSearchTermClick(e.target.value)}
                    style={{
                        border:"none",
                        // width:"90%",
                        marginRight:"5px"
                    }}
                    className="no-border-on-focus"
                    // className="input-with-icon"
                />
                <FaPlus />

        </div>
          <hr />

      {!sourceLoader?locationData.length>0&&locationData.map((location, index) => (
        <DropdownItem key={index} style={{
          paddingBottom:"10px",
          paddingLeft:"40px",
          height:"60px"
        }} onClick={()=>handleLocation(location)}>
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
      )):<BeatLoader />}
    </DropdownMenu>
  </Dropdown>

}