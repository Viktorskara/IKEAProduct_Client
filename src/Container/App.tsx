import { Footer, Header } from '../Components/Layout';
import { CreateProduct, Home, NotFound } from '../Pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="text-success">
      <Header/>
      <div className='p-5'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/createProduct' element={<CreateProduct/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
