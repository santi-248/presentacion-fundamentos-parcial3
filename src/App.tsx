import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Problem1 from './pages/Problem1'
import Problem2 from './pages/Problem2'
import Problem3 from './pages/Problem3'
import Problem4 from './pages/Problem4'
import Problem5 from './pages/Problem5'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/problema/1" element={<Problem1 />} />
          <Route path="/problema/2" element={<Problem2 />} />
          <Route path="/problema/3" element={<Problem3 />} />
          <Route path="/problema/4" element={<Problem4 />} />
          <Route path="/problema/5" element={<Problem5 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
