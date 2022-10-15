import { useEffect } from "react"
import { useSelector } from "react-redux"
import { createBrowserRouter, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Layout from "../components/layout/Layout"
import { SummaryProvider } from "../context/summaryContext"
import Auth from "../pages/auth/Auth"
import Authenticate from "../pages/authenticate/Authenticate"
import CSS from "../pages/css/CSS"
import Homepage from "../pages/home/Homepage"
import JavaScript from "../pages/javascript/JavaScript"
import NotFound from "../pages/notfound/NotFound"
import ReactPage from "../pages/react/React"
import SignIn from "../pages/signin/SignIn"
import SignUp from "../pages/signup/SignUp"
import Summary from "../pages/summary/Summary"

const SummaryRoutes = ({ Component }) => {
  return (
    <SummaryProvider>
      <Component />
    </SummaryProvider>
  )
}

const PrivateRoute = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      return navigate('/auth/signin', { state: { from: location }, replace: true })
    }
  }, [user, location, navigate])

  return (
    <Outlet />
  )
}


// Refresh Token
// Redux Dev Tools
// React Dev Tools
// Custom Hooks
// PropTypes
// Logout
// Notifications

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Outlet /></Layout>, // could be a layout instead fragment
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: 'content',
            element: <SummaryRoutes Component={Summary} />,
          },
          {
            path: 'content/react',
            element: <SummaryRoutes Component={ReactPage} />
          },
          {
            path: 'content/javascript',
            element: <SummaryRoutes Component={JavaScript} />
          },
          {
            path: 'content/css',
            element: <SummaryRoutes Component={CSS} />
          },
        ]
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Authenticate />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  }
])
