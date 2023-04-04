import { useEffect, useState } from 'react';
import { authentication } from './firebase/config';
import { StateContextProvider } from './providers';
import AuthNavigator from './AuthNavigator';


export default function App() {

  // const {user, setUser } = useStore();

  return(
    <StateContextProvider>
      <AuthNavigator />
    </StateContextProvider>
  )
}
