import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'

  const ROUTER = createBrowserRouter([
    {path: '/', element:<Login/>},
    {path: '/', element:<RootLayout/>, errorElement: <ErrorPage/>, id:'root', loader: () => { return { login: localStorage.getItem('token') ? true : false};},
    children: [
    {path: '/landing-page', element: <LandingPage/>},
  ]},
  ])

function App() {


  return (
    <>
      <RouterProvider router={ROUTER}/>
    </>
  )
}

export default App
