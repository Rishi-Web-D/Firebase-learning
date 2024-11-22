import Auth from "./components/Auth"
import { Routes , Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Nav from "./components/Nav"
import AddStudent from "./components/AddStudent"
import ListStudents from "./components/ListStudents"

function App() {
  return (
    <>
    
    <Nav/>
    <Routes>
    <Route path="/" element={<Auth/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/add-student" element={<AddStudent/>} />
    <Route path="/list-students" element={<ListStudents/>} />
   </Routes>
   </>
  )
}

export default App
