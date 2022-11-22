import { 
  useCallback,
  useMemo, 
  useRef, 
  useState 
} from 'react';
import {
  GoogleMap, 
  Marker, 
  MarkerClusterer,
  DirectionsRenderer
} from "@react-google-maps/api";
import Places from './Places';
import Distance from '../Distance';
import {Geolocation} from "@capacitor/geolocation";


import {
  LatLit,
  DirectionsResult,
  MapOptions
} from '../Type';


// link to maps code: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions

const containerStyle = {
  "width": "600px",
  "height": "600px",
  "zIndex": "-1"
};


const Map = () => {
  const mapRef = useRef<GoogleMap>()
  const [directions, setDirections] = useState<DirectionsResult>()
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [office, setOffice] = useState<LatLit>();
  const [zoom, setZoom] = useState<number>(12);

  const myLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
    return;
  };
  myLocation().then(res => {
    return res
  });

  const center: LatLit = useMemo(() => ({lat: Number(lat), lng: Number(lng)}), []);
  const houses = useMemo(() => 
    generateHouses(center), [center]);

  const options: MapOptions = useMemo(() => ({
    mapId: "c9edaff778df6e7c",
    mapTypeId: "JavaScript - Raster",
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false
  }), []);


  const fetchDirections = (house: LatLit) => {
    if (!office) return;
    let directionsService = new google.maps.DirectionsService();

    directionsService.route({
      origin: house,
      destination: office,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === "OK" && result) {
        setDirections(result);
      };
    });
  };

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);


  // the setOffice attribute for Places is meant to update state, store the lng & lat of the office being selected.
  return (
    // <div className='container'>
    //   <div className='controls' >
    //     <h1>
    //       Directions:
    //     </h1>
    //     <Places 
    //       setOffice={(position: any) => {
    //         setOffice(position);
    //         mapRef.current?.panTo(position)}}/>
          
    //     {!office && <p>Enter the address of your office</p>}
    //     {directions && <Distance leg={directions.routes[0].legs[0]}/>}
        
    //   </div>
    //   <div className="map" >
    //     <GoogleMap
    //       id="map"
    //       mapContainerStyle={containerStyle}
    //       zoom={zoom}
    //       center={center}
    //       options={options}
    //       onLoad={onLoad}>
        
    //       {directions && (
    //         <DirectionsRenderer 
    //           directions={directions}
    //           options={{
    //           polylineOptions: {
    //             zIndex: 50,
    //             strokeColor: "#1976D2",
    //             strokeWeight: 5,
    //           },
    //         }}/>
    //       )}
    //       {office && (
    //         <>
    //           <Marker position={office}/> 
    //           <MarkerClusterer >
                
    //           { (clusterer) => 
    //             <>
    //               { houses.map((house) => (
    //                 <Marker
    //                   key={house.lat}
    //                   position={house}
    //                   clusterer={clusterer}
    //                   onClick={() => {
    //                     fetchDirections(house)}}/>
    //                 ))
    //               }
    //             </>
    //           }
    //           </MarkerClusterer>
    //         </>
    //       )}
    //     </GoogleMap>
    //   </div>
    // </div>
    <div >
      <iframe src="https://storage.googleapis.com/maps-solutions-go46b53bdc/commutes/spj1/commutes.html"
        width="100%" height="400px"
        style={{border:"0"}}
        loading="lazy">
      </iframe>
    </div>
  )
}

const generateHouses = (position: LatLit) => {
  const _houses: Array<LatLit> = [];

    _houses.push({
      lat: position.lat,
      lng: position.lng 
      
    })
  return _houses
}

export default Map;