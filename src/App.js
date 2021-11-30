import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dairy from './Components/DiaryPage.js/Dairy';
import Memory from './Components/Memory/Memory';
import EditDeleteMemory from './Components/Edit_Delete_Memory/EditDeleteMemory';
import ViewMemory from './Components/ViewMemory/ViewMemory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path="/" element={<Homepage />} />
        <Route eaxct="true" path="/Login" element={<Login />} />
        <Route exact="true" path="/Register" element={<Register />} />
        <Route exact="true" path="/DiaryPage" element={<Dairy />} />
        <Route exact="true" path="/DiaryPage/SavedMemory" element={<Memory />} />
        <Route exact="true" path="/DiaryPage/SavedMemory/EditDeleteMemory/:id" element={<EditDeleteMemory />} />
        <Route exact="true" path="/DiaryPage/SavedMemory/ViewMemory/:id" element={<ViewMemory />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
