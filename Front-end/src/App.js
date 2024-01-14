import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Customer'
import Admin from './Admin'

function App() {
  return (
    <>
        <BrowserRouter>  
          <Routes>
            <Route path='/*' element={<Shop />} />
            <Route path='/admin/*' exact element={<Admin/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
