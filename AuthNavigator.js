import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { LoggedInScreens, LoggedOutScreens } from './Navigator';
import { useStore } from './providers';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from './firebase/config';
import { getUser } from './firebase/operations';

const AuthNavigator = () => {
    const {user, setUser} = useStore();

    const Usered= async(id) => {
      const token = await getUser(id);
      setUser(token)
    }

    useEffect(
        () =>
        onAuthStateChanged(authentication, authUser => {
            authUser ?  Usered(authentication.currentUser.uid) : setUser(null)
        })
        ,[user])

  return (<>
    {user ? <LoggedInScreens /> : <LoggedOutScreens />}
    </>
  )
}

export default AuthNavigator