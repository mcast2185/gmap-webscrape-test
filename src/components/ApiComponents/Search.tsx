import React from "react"
import { Helmet } from "react-helmet";

const Search = () => {
  return (
    <div>
      <Helmet>
        <script
          async
          src="https://cse.google.com/cse.js?cx=123:456"
        ></script>
      </Helmet>

      <div className="gcse-search"></div>
    </div>
  )
}


export default Search;