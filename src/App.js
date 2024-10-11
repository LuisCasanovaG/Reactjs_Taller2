import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Main from './componentes/main';
import RickAndMorty from './componentes/rickymorty';

function App() {
  

  return(
    <>
        <Router>
         
          <Routes>
            <Route path="/" element={<Main/>}/>
           <Route path="/rym" element={<RickAndMorty/>}/>
          </Routes>
        </Router>
        
    </>
  );

}

export default App;

