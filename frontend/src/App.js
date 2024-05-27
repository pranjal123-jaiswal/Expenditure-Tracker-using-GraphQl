import { Navigate, Route , Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"
import TranscationPage from "./Pages/TranscationPage"
import NotFoundPage from "./Pages/NotFoundPage"
import Header from "./components/ui/Header"
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATE_USER } from "./graphql/Queries/user.query";
import {Toaster} from "react-hot-toast"

export default function App() {
  const {loading , data , error} = useQuery(GET_AUTHENTICATE_USER)
  console.log("Loading" , loading)
  console.log("Data" , data)
  console.log("Error" , error)

  if(loading) return null
  // const authUser = true
  return (
    <>
    {data?.authUser && <Header/>}
    <Routes>
      <Route path="/" element={ data?.authUser ? <HomePage/> : <Navigate to ="/login"/> } />
      <Route path="/login" element={ !data?.authUser  ? <LoginPage/> : <Navigate to ="/"/> }/>
      <Route path="/signUp" element={!data?.authUser  ? <SignUpPage/> : <Navigate to ="/"/>}/>
      <Route path='/transcation/:id' element={data?.authUser ? <TranscationPage/> : <Navigate to ="/login"/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}