import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { getOrCreateUserProfile } from './common/util/API';
import { useUserStore } from './common/util/Store/userStore';
import AccountPage from './components/AccountPage';
import AccountSettings from './components/AccountSettingsPage';
import DashboardPage from './components/DashboardPage';
import EventPage from './components/EventPage';
import GroupList from './components/GroupPage/GroupList';
import GroupTimeline from './components/GroupPage/GroupTimeline';
import Layout from './components/Layout';
import StartPage from './components/startPage';
import TopicList from './components/TopicPage/TopicList';
import TopicTimeline from './components/TopicPage/TopicTimeline';
import PrivateRoute from './routes/utils';
import Dashboard from './view/Dashboard';
import NotFoundPage from './components/NotFoundPage';
import EventTimeline from './components/EventPage/EventTimeline';
import { useBoundStore } from './common/util/Store/Store';
import { defaultUserProfile } from './common/interface/UserProfile';
import { Spinner } from './components/util/spinner';

function App() {
  const { initialized, keycloak } = useKeycloak()
  const [loading, setLoading] = useState(false)
  const userState = useUserStore((state) => state)
  const store = useBoundStore((state) => state)

  useEffect(() => {
      const setUserProfile = async () => {
        if(keycloak.authenticated){
          if(userState.User.id === -1 || typeof userState.User === 'string'){
            setLoading(true)
            console.log('set user')
            await getOrCreateUserProfile()
            .then((r) => {userState.setUser(r)
            setLoading(false)})
            .finally( async () => { console.log('user has been set now')
              await store.fetchEvents()
              await store.fetchGroups()
              await store.fetchTopics()
            })
          }
        }
        else if(!keycloak.authenticated){
          console.log('set user default')
          if(userState.User.id !== -1 || typeof userState.User === 'string'){
            userState.setUser(defaultUserProfile)
            store.removeEvents()
            store.removeTopics()
            store.removeGroups()
          } 
        }
      }
    setUserProfile()
  }, [keycloak.authenticated, userState, store])
  //console.log(store.Events)
  if (!initialized || loading) {
    return (<div className="h-screen w-screen"> <Spinner /></div>)
  }

  
  return (
    <BrowserRouter> 
    <Layout>
      <Routes>
        <Route path="/" element={<StartPage />} /> 

          <Route path="/profile-settings" element={
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
                <GroupTimeline/>
              </PrivateRoute>
            }/>
            <Route path="/topics/:id"      element={
              <PrivateRoute>
                <TopicTimeline />
              </PrivateRoute>
            }/>
            <Route path="/events"      element={
              <PrivateRoute>
                <EventPage />
              </PrivateRoute>
            }/>
            <Route path='/events/:id' element={
              <PrivateRoute>
                <EventTimeline />
              </PrivateRoute>
            }/>
            <Route path="*"  element={
            <PrivateRoute>
              <NotFoundPage />
            </PrivateRoute>     
          }/>
      </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
