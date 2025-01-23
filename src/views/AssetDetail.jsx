import React from 'react';
import { useParams } from 'react-router-dom';

const AssetDetail = () => {
  const { id } = useParams();
  return <div>Asset Detail - ID: {id}</div>;
};

export default AssetDetail;
