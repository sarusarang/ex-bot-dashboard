import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import LoadingScreen from "./components/ui/LoadingScreen"

// lazy load pages
const Home = lazy(() => import("./pages/index"))
const NotFound = lazy(() => import("./pages/NotFound"))

// lazy load layout
const MainLayout = lazy(() => import("./components/layout/MainLayout"))

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<MainLayout />} >
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
