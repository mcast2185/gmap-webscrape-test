import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
}
from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
import React from "react";
import ClientOnly from './ApiComponents/ClientSide';
import Search from "./ApiComponents/Search";

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
    suggestions: {status, data}, 
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();


    const results = await getGeocode({address: val})
    const {lat, lng} = await getLatLng(results[0])
    setOffice({lat, lng})
  }
  // console.log({status, data});
  return (
    <div>
      sample text
    </div>
    // <Combobox onSelect={handleSelect}>
    //   <ComboboxInput 
    //     value={value} 
    //     onChange={e => setValue(e.target.value)}
    //     style={comBoxInput}
    //     placeholder="Search"/>
    //     <ComboboxPopover>
    //       <ComboboxList>
    //         {status === "OK" && data.map(({place_id, description}) => (
    //           <ComboboxOption style={comBoxList} key={place_id} value={description}/>
    //         ))}
    //       </ComboboxList>
    //     </ComboboxPopover>
    // </Combobox>
  )
}
export default Places;