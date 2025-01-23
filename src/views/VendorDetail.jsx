import React from 'react';
import { useParams } from 'react-router-dom';

const VendorDetail = () => {
  const { id } = useParams();
  return <div>Vendor Detail - ID: {id}</div>;
};

export default VendorDetail;
