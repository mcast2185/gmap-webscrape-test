import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
}
from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React, { useEffect } from "react";
import { useLoadScript } from '@react-google-maps/api';


type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
};

const comBoxInput = {
  width: "100%",
  padding: "0.5rem"
};

const comBoxList = {
  background: "black"
};

const libraries: any = ["places"]
const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);
const clientId = String(process.env.CLIENT_ID);


const Places: React.FC<PlacesProps> = ({setOffice}) => {
  // const {isLoaded} = useLoadScript({
  //   googleMapsApiKey: apiKey,
  //   libraries: libraries,
  //   googleMapsClientId: clientId
  // });

  const {
    ready, 
    value, 
    setValue, 
    suggestions: {
      status, data
    }, clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({address: val})
    const {lat, lng} = getLatLng(results[0])
    setOffice({lat, lng})
  }

  // const scriptLoad: any = () => {
  //   if (document.querySelector('gapiScript')) return isLoaded}
  

  // useEffect(() => {
  //   return scriptLoad()
  // })

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput 
        value={value} 
        onChange={e => setValue(e.target.value)}
        style={comBoxInput}
        placeholder="Search"/>
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map(({place_id, description}) => (
              <ComboboxOption style={comBoxList} key={place_id} value={description}/>
            ))}
          </ComboboxList>
        </ComboboxPopover>
    </Combobox>
  )
}
export default Places;