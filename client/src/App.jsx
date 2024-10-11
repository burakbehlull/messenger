import { BrowserRouter } from "react-router-dom"
import Routes from "./routers/routes"
import { Socket as IO } from './services/Socket'
function App() {
  const Socket = new IO()
  return (
    <BrowserRouter>
        <Socket.Provider>
          <Routes />
        </Socket.Provider>
    </BrowserRouter>
  )
}

export default App
