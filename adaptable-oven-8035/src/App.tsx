
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllRoutes from './Routes/AllRoutes';
import { restoreSession } from './Redux/AuthReducer/action';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession() as any);
  }, [dispatch]);

  return (
  <div>
      <AllRoutes/>
      </div>
  );
}

export default App;
