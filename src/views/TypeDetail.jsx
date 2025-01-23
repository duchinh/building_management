import React from 'react';
import { useParams } from 'react-router-dom';

const TypeDetail = () => {
  const { id } = useParams();
  return <div>Type Detail - ID: {id}</div>;
};

export default TypeDetail;
