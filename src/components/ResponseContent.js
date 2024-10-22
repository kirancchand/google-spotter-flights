import React, { useState,Fragment } from 'react';
import {
    Row,Col,Card,CardBody
  } from 'reactstrap';
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { VectorMap } from '@south-paw/react-vector-maps'
import world from '../common/world.svg.json'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
export default function ResponseContent(props){
  const mapStyles = {
    width: '100%',
    height: '100%',
};
    return <Row>
      <Col md="12">       
          <Card>
              <CardBody>
                      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                        </Marker>
                      </MapContainer>
              </CardBody>
          </Card>
      
      </Col>
    </Row>
}