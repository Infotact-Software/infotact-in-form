
import InternshipForm from './utils/internship-form';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SuccessPage from './utils/success';
const App = () => {
  return (
    <div>
      <Router>
     <Routes>
      
        <Route path="/" element={<InternshipForm/>} />
        <Route path="/success" element={<SuccessPage/>} />
        
      </Routes>
      </Router>
    </div>
  )
}

export default App
