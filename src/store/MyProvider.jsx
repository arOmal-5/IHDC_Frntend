import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const[profilePercentage,setProfilePercentage]=useState(0)
  const[profileTriger,setProfileTriger]=useState(Date.now())
  const[apiTriger,setApiTriger]=useState(Date.now())

  
  return (
    <MyContext.Provider value={{ isProfileVisible, setIsProfileVisible,profilePercentage,setProfilePercentage,profileTriger,setProfileTriger, apiTriger, setApiTriger}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;