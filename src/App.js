import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MatchPredict from './MatchPredict';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchPredict />} />
      </Routes>
    </Router>
  );
};
export default App;