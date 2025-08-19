import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import QueryPage from "./pages/QueryPage"
import ResultsPage from "./pages/ResultsPage"
import { Toaster } from "./components/ui/toaster"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<QueryPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App

