import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountPage from './components/AccountPage';
import AccountSettings from './components/AccountSettingsPage';
import DashboardPage from './components/DashboardPage';
import Layout from './components/Layout';
import StartPage from './components/StartPage';
import PrivateRoute from './routes/utils';
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

          <Route path="/account/settings" element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }/>
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path="/account/:id" element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
            }/>  
          <Route path="/account" element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
            }/>

            <Route path="/timeline" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
            }/>     

      </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
