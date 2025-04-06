import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponents from './Components/EmployeeComponents'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { ListEmployeeComponent } from './Components/ListEmployeeComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
          <Route path='/add-employee' element={<EmployeeComponents/>}></Route>
          <Route path='/edit-employee/:id' element={<EmployeeComponents />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
