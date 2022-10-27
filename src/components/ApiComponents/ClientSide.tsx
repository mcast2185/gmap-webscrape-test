import React, { useState, useEffect } from 'react';


const ClientOnly = ({ children: {}, ...delegated }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) {
      return null;
    }
    return (
      <div {...delegated}>
        {/* {children} */}
        Sample text
      </div>
    );
  }

  export default ClientOnly;