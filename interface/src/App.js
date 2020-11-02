import './App.css';
import {AuthProvider} from './components/Auth/AuthProvider';
import Main from './components/Main/Main';

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
