import React from "react"
import { Helmet } from "react-helmet";


const scriptTag = () => {
  return (
    <script
    async
    src="https://cse.google.com/cse.js?cx=61f906362015a4bcf">
  </script>
  )
};

const Search = () => {

  return (
    <div>
      <Helmet>
        {scriptTag()}
      </Helmet>

      <div className="gcse-search"></div>
    </div>
  )
}




export default Search;