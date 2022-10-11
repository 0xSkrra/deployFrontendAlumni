import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountPage from './components/AccountPage';
import AccountSettings from './components/AccountSettingsPage';
import Layout from './components/Layout';
import StartPage from './components/StartPage';
import Dashboard from './view/Dashboard';

function App() {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }
  
  return (
    <BrowserRouter> 
    <Layout>
      <Routes>
        <Route path="/" element={<StartPage />} /> 
        <Route path="/account/settings" element={<AccountSettings />}/>
        <Route path='/timeline' element={<Dashboard />}/>
        <Route path="/account/:id" element={<AccountPage />}/>  
        <Route path="/account" element={<AccountPage />}/>       
      </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
