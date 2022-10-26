import React from 'react';
import {DistanceProps} from './Type'


const Distance: React.FC<DistanceProps> = ({leg}) => {
  if (!leg.distance || !leg.duration) return null;
  return (
    <div>
       <div>Distance: {leg.distance?.text}</div>
       <div>Duration: {leg.duration?.text}</div>
    </div>
  )
}

export default Distance;