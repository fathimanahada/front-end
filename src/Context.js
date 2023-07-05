import React, { useState } from "react";
import { createContext } from "react";
export const Fav = createContext();

function Context({ children }) {
  const [favAdded, setFavAdded] = useState(false);
  
  return (
    <Fav.Provider value={{ favAdded, setFavAdded }}>
      
          {children}
       
    </Fav.Provider>
  );
}

export default Context;