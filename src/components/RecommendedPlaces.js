import React, { useState,Fragment } from 'react';
import {
    Row,Col,Card,CardBody
  } from 'reactstrap';
import Amsterdam from '../assets/recommended/Amsterdam.webp';
import Beijing from '../assets/recommended/Beijing.webp';
import BuenosAires from '../assets/recommended/Buenos-Aires.webp';
import Copenhagen from '../assets/recommended/Copenhagen.webp';
export default function RecommendedPlaces(props){
let recommendedLocation=[{
  placeImgUrl:Amsterdam,
  place:"Amsterdam",
  cost:"$200",
  date:"Oct 28 - Nov 28 ",
  type:"Nonstop - 4 hr 25 min"
},
{
  placeImgUrl:Beijing,
  place:"Beijing",
  cost:"$200",
  date:"Oct 28 - Nov 28 ",
  type:"Nonstop - 4 hr 25 min"
},
{
  placeImgUrl:BuenosAires,
  place:"BuenosAires",
  cost:"$200",
  date:"Oct 28 - Nov 28 ",
  type:"Nonstop - 4 hr 25 min"
},
{
  placeImgUrl:Copenhagen,
  place:"Copenhagen",
  cost:"$200",
  date:"Oct 28 - Nov 28 ",
  type:"Nonstop - 4 hr 25 min"
}


]
    return <Row>
      {
        recommendedLocation.map((recommendedlocation)=>{
          return <Col md="3">       
          <Card>
              <CardBody>
                <div>
                    <img src={recommendedlocation.placeImgUrl} style={{width:"100%",height:"auto"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:"bold",marginTop:"10px"}}><span>{recommendedlocation.place}</span><span>{recommendedlocation.cost}</span></div>
                <div>{recommendedlocation.date}</div>
                <div>{recommendedlocation.type}</div>
              </CardBody>
          </Card>
      
          </Col>
        })
      }

    </Row>
}