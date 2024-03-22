import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Layout } from './pages/Laytout'
import { User } from './components/User'
import { RecoilRoot } from 'recoil'
import { Send } from './pages/Send'

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/send" element={<Send />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
