
import { StateContextProvider } from './providers';
import AuthNavigator from './AuthNavigator';


export default function App() {

  return (
    <StateContextProvider>
      <AuthNavigator />
    </StateContextProvider>
  )
}
