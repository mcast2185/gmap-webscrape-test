export interface Center {
  lat: number,
  lng: number
};
export interface directionsRequest {
  origin: google.maps.LatLng | string | google.maps.Place | google.maps.LatLngLiteral,
  destination: google.maps.LatLng | string | google.maps.Place | google.maps.LatLngLiteral,
  travelMode: google.maps.TravelMode.DRIVING
};
export interface geocodeRequest {
  address: string,
  location: google.maps.LatLng,
  bounds: google.maps.LatLngBounds,
  componentRestrictions: google.maps.GeocoderComponentRestrictions,
  region: string
};