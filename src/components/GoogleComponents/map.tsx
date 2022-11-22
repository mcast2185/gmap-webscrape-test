import React from 'react';

// link to maps code: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions

const Map: React.FC = () => {

  return (
    <div >
      <iframe src="https://storage.googleapis.com/maps-solutions-go46b53bdc/commutes/spj1/commutes.html"
        width="100%" height="400px"
        style={{border:"0"}}
        loading="lazy">
      </iframe>
    </div>
  )
}


export default Map;