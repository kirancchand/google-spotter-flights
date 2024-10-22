import React, { useState,Fragment } from 'react';
import {
    Row,Col,
  } from 'reactstrap';
export default function PersonType(props){



    const decrementFunc=()=>{
      if(props.type=="Adults"){
        if(props.passengers.adults!=1){
          let newpassenger={
            ...props.passengers,
          }
          newpassenger.adults=props.passengers.adults-1;
          props.setPassengers(newpassenger)
        }
      }
      else if(props.type=="Children"){
        if(props.passengers.childrens!=0){
          let newpassenger={
            ...props.passengers,
          }
          newpassenger.childrens=props.passengers.childrens-1;
          props.setPassengers(newpassenger)
        }
      }
      else if(props.type=="Infants"){
        if(props.passengers.infants!=0){
          let newpassenger={
            ...props.passengers,
          }
          newpassenger.infants=props.passengers.infants-1;
          props.setPassengers(newpassenger)
        }
      }
      
     
    }
  
    const incrementFunc=()=>{
      if(props.type=="Adults"){
        let newpassenger={
          ...props.passengers,
        }
        newpassenger.adults=props.passengers.adults+1;
        props.setPassengers(newpassenger)
      }
      else if(props.type=="Children"){
        let newpassenger={
          ...props.passengers,
        }
        newpassenger.childrens=props.passengers.childrens+1;
        props.setPassengers(newpassenger)
      }
      else if(props.type=="Infants"){
        let newpassenger={
          ...props.passengers,
        }
        newpassenger.infants=props.passengers.infants+1;
        props.setPassengers(newpassenger)
      }
      
    }

    const valueFunc=()=>{
      if(props.type=="Adults"){
        return props.passengers.adults
      }
      else if(props.type=="Children"){
        return props.passengers.childrens
      }else if(props.type=="Infants"){
        return props.passengers.infants
      }
    }
    return  <Row style={{marginBottom:"20px"}}>
    <Col md="6">
      {props.type}
    </Col>
    <Col md="6">
        <span 
        className='counter'
        onClick={()=>decrementFunc()}>-</span>
        {valueFunc()}
        <span className='counter' onClick={()=>incrementFunc()}>+</span>
    </Col>
  </Row>
}