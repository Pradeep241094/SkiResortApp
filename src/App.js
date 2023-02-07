import './App.css';
import Wrapper from './components/Wrapper';
import SkiResortsList from './components/SkiResorts';
import CreateSkiResort from './components/CreateSkiResort';
import EditSkiResort from './components/EditSkiResort';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Wrapper>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SkiResortsList/>} />
        <Route path="/add" element={<CreateSkiResort />} />
        <Route path="/edit/:id" element={<EditSkiResort />} />
      </Routes>
    </BrowserRouter>
    </Wrapper>
    </div>
  );
}

export default App;

