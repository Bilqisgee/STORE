import { Routes, Route, /*Navigate */} from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar";

function App() {
  

  return (
    <>
    <div className="min-h-100vh ">
<Navbar />
<Routes>
{/* <Route path="/" element={<Navigate to="/HomePage" />} /> */}
  <Route   path="/HomePage"  element= { <HomePage/> } />
  <Route   path="/CreatePage"  element= { <CreatePage/> } />
</Routes>


    </div>
    </>
  )
}

export default App
