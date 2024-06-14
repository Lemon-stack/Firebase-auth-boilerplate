import './App.css'
import AuthProvider from './context/Authcontext';
import {Routes, Route} from 'react-router-dom';
import { Signup, Login, Container, Home, Hero, PrivateRoutesContainer, PasswordReset} from './Routes/index'
import PrivateRoute from './context/PrivateRoute';
function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Container />}>
         <Route index element={<Hero />}/>
         <Route path="signup" element={<Signup />}/>
         <Route path="login" element={<Login />}/>
         <Route path="password-reset" element={<PasswordReset />}/>
         <Route path="dashboard" element={<PrivateRoute element={<PrivateRoutesContainer/>}/>}>
           <Route index element={<Home/>}/>
         </Route>
        </Route>
      </Routes> 
    </AuthProvider>

    </>
  )
}

export default App
