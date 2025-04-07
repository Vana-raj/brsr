
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import RouterConfig from './RouteConfig';
import {Provider} from "react-redux"
import store from './features/Store';
function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={RouterConfig} />
    </Provider>

  );
}

export default App;
