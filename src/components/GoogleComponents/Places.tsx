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
import { isPlatform } from '@ionic/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


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

const Places: React.FC<PlacesProps> = ({setOffice}) => {

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