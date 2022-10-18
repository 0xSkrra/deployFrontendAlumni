import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { getOrCreateUserProfile } from './common/util/API';
import { useUserStore } from './common/util/Store/userStore';
import AccountPage from './components/AccountPage';
import AccountSettings from './components/AccountSettingsPage';
import DashboardPage from './components/DashboardPage';
import GroupList from './components/GroupPage/GroupList';
import GroupTimeline from './components/GroupPage/GroupTimeline';
import Layout from './components/Layout';
import StartPage from './components/StartPage';
import TopicList from './components/TopicPage/TopicList';
import TopicTimeline from './components/TopicPage/TopicTimeline';
import PrivateRoute from './routes/utils';
import Dashboard from './view/Dashboard';

function App() {
  const { initialized, keycloak } = useKeycloak()
  const userState = useUserStore((state) => state)
  useEffect(() => {
    if(keycloak.authenticated){
      if(userState.User.id === -1 || typeof userState.User === 'string') getOrCreateUserProfile().then((u) => userState.setUser(u))
    }
  }, [keycloak.authenticated, userState])

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
          <Route path='/dash' element={
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
            <Route path="/groups" element={
            <PrivateRoute>
              <GroupList />
            </PrivateRoute>
            }/>
            <Route path="/topics"      element={
              <PrivateRoute>
                <TopicList />
              </PrivateRoute>
            }/>
            <Route path="/groups/:id"      element={
              <PrivateRoute>
                <GroupTimeline />
              </PrivateRoute>
            }/>
            <Route path="/topics/:id"      element={
              <PrivateRoute>
                <TopicTimeline />
              </PrivateRoute>
            }/>


      </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
