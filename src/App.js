import React, { useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Footer/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subsribe from './components/Payments/Subsribe';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import NotFound from './components/NotFound/NotFound';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminCourses from './components/Admin/Admincourses/AdminCourses';
import User from './components/Admin/Users/User';
import CreateCourse from './components/Admin/CreateCourses/CreateCourse';
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from "react-hot-toast";
import { loadUser } from './redux/actions/user';
import {ProtectedRoute} from "protected-route-react";
import Loader from './components/Layout/Header/Loader';



function App() {

  
  window.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
  })
  const dispatch=useDispatch();
  const {isAuthenticated,user,message,error,loading}= useSelector(state=>state.user);
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"})
    }
  },[dispatch,error,message]);


  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch]);
  return (<Router>
   {
    loading ? (<Loader/>):(
      <>
       <Header isAuthenticated={isAuthenticated} user={user}/>
    <Routes>
      <Route path='/' element={<Home / >}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path="/course/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CoursePage user={user}/></ProtectedRoute>}/>
      <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><UpdateProfile/></ProtectedRoute>}/>
      <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword/></ProtectedRoute>}/>
      <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/profile"}><Login/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile user={user}/></ProtectedRoute>}/>
      <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/profile"}><Register/></ProtectedRoute>}/>
      <Route path='/forgotpassword' element={ <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgotPassword />
                </ProtectedRoute>}/>
      <Route path='/resetpassword/:token' element={ <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/admin/dashboard'
       element={
       <ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}> 
        <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path='/admin/courses' element={<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}> 
        <AdminCourses/>
        </ProtectedRoute>}/>
      <Route path='/admin/users' element={<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}> 
        <User/>
        </ProtectedRoute>}/>
      <Route path='/admin/createcourse' element={<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}> 
        <CreateCourse/>
        </ProtectedRoute>}/>
      <Route path='/request' element={<Request/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subsribe user={user}/></ProtectedRoute>}/>
      <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>


      <Route path='/paymentfail' element={<PaymentFail/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    <Footer/>

    <Toaster/>
      </>
    )
   }
  </Router>)
}

export default App;
