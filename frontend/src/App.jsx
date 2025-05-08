import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './pages/Sign'
import Home from './pages/Home';
import Login from './pages/Login'
import Explore from './pages/explore';
import Profile from './pages/Profile';
import Editpage from './pages/Editpage';
import ProtectedRoute from './ProtectedRoute';
import Other_profile from './pages/Other_profile';
import Subscription from './pages/Subscription';
import Verify from './pages/Verify';
import Not from './components/Not';




function App() {

  return (
    <>
    <Not />
    <div>
       <Router>
        <Routes>
        <Route path="/" element={<Verify/>} />
          <Route path="/sign" element={<Sign />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<Login />}/>
          <Route path='/explore' element={<ProtectedRoute><Explore /></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path='/edit' element={<ProtectedRoute><Editpage /></ProtectedRoute>}/>
          <Route path='/:id' element={< Other_profile/>}/>
          <Route path='/subscribe' element={< Subscription/>}/>
        </Routes>
      </Router>
    </div>

    </>
  )
}

export default App
