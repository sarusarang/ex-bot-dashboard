import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import LoadingScreen from "./components/ui/LoadingScreen"




// lazy load pages
const Home = lazy(() => import("./pages/index"))
const BotManager = lazy(() => import("./pages/BotManager"))
const FlowBuilder = lazy(() => import("./pages/FlowBuilder"))
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
            <Route path="/chatbot" element={<BotManager />} />
         
          </Route>

          {/* Flow Builder (Full Screen without MainLayout) */}
          <Route path="/chatbot/flow" element={<FlowBuilder />} />


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
