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
import {Geolocation} from "@capacitor/geolocation";

import Places from './Places';
import Distance from './Distance';
import {
  LatLit,
  DirectionsResult,
  MapOptions
} from './Type';

const containerStyle = {
  width: "600px",
  height: "600px"
};


const Map = () => {
  // the useRef and useState hooks used to render maps is essentially the same
  // const [service, setService] = useState<gMapDirectionsService>()
  const mapRef = useRef<GoogleMap>()
  const [directions, setDirections] = useState<DirectionsResult>()
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [office, setOffice] = useState<LatLit>();
  const [zoom, setZoom] = useState<number>(12);

  // The code directly below is used for dynamic location, since it is in its nature to change we arent allowed to use useMemo
  const center: LatLit= {lat: Number(lat), lng: Number(lng)}

  // const center = useMemo<LatLit>(() => ({
  //   lat: 39.8274449, 
  //   lng: -105.0124384
  // }), [])

  const options = useMemo<MapOptions>(() => ({
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false
  }), []);

  const houses = useMemo(() => 
    generateHouses(center), [center]);

  const fetchDirections = (house: LatLit) => {
    if (!office) return;

    let directionsService = new google.maps.DirectionsService()

    directionsService.route({
      origin: office,
      destination: house,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === "OK" && result) {
        setDirections(result);
      }
    });
  };

  const myLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
    return;
  };
  myLocation().then(res => {
    return res
  });

  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  return (
    <div className='container'>
      <div className='controls' >
        <h1 >
          Commute?
        </h1>
        <Places setOffice={(position: any) => {
          setOffice(position);
          mapRef.current?.panTo(position)}}/>
        {!office && <p>Enter the address of your office</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]}/>}
      </div>
      <div className="map" >
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          zoom={zoom}
          center={center}
          options={options}
          onLoad={onLoad}>
        
          {directions && (
            <DirectionsRenderer 
              directions={directions}
              options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}/>
          )}
          {office && (
            <>
              <Marker position={office}/> 
              <MarkerClusterer >
                
              { (clusterer) => 

                // here, MarkerCluster expects back a JSX element so we couldnt just run the map function
                // so we came up with an alternative.
                <>
                  { houses.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                    }}/>
                  ))}
                </>
              }
              </MarkerClusterer>
            </>
          )}
        </GoogleMap>
      </div>
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