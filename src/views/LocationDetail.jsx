import React from 'react';
import { useParams } from 'react-router-dom';

const LocationDetail = () => {
  const { id } = useParams();
  return <div>Location Detail - ID: {id}</div>;
};

export default LocationDetail;
