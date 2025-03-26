import React, {
  createContext,
  useState,
  useMemo,
} from 'react';
import {storage} from './server';

export const Data = createContext();

const GlobalData = ({children}) => {

  const [storedPasswords, setStoredPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({
    account: null,
    username: null,
    password: null,
    connectedAccount: null,
    website: null,
    notes: null,
  });
  const [recentlyAdded,setRecentlyAdded] = useState([])
  const [showmsg,setShowmsg] = useState(false)

  const [userInformation,setUserInformation] = useState({
    username: null,
    password: null,
    hint: null
  })

  return (
    <Data.Provider
      value={{
        storedPasswords,
        setStoredPasswords,
        newPassword,
        setNewPassword,
        userInformation,
        setUserInformation,
        recentlyAdded,
        setRecentlyAdded,
        showmsg,
        setShowmsg
      }}>
      {children}
    </Data.Provider>
  );
};

export default GlobalData;
