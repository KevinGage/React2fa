import './App.css';
import {AuthProvider} from './components/Auth/AuthProvider';
import {OtpProvider} from './components/Auth/OtpProvider';
import Main from './components/Main/Main';

function App() {
  return (
    <AuthProvider>
      <OtpProvider>
        <Main />
      </OtpProvider>
    </AuthProvider>
  );
}

export default App;
