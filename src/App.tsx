import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import LoadingScreen from "./components/ui/LoadingScreen"




// lazy load pages
const Home = lazy(() => import("./pages/index"))
const NotFound = lazy(() => import("./pages/NotFound"))



// lazy load layout
const MainLayout = lazy(() => import("./components/layout/MainLayout"))
const AuthLayout = lazy(() => import("./components/layout/AuthLayout"))



// lazy load auth pages
const Login = lazy(() => import("./pages/auth/Login"))
const Register = lazy(() => import("./pages/auth/Register"))
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"))




function App() {


  return (


    <>

      <Suspense fallback={<LoadingScreen />}>


        <Routes>


          {/* Main App Routes */}
          <Route element={<MainLayout />} >
         
            <Route index element={<Home />} />
         
          </Route>


          {/* Auth Routes */}
          <Route element={<AuthLayout />}>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

          </Route>


          <Route path="*" element={<NotFound />} />


        </Routes>

      </Suspense>

    </>

)

}


export default App
