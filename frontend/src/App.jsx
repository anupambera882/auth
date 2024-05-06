import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Register from './components/Register';
import Missing from './components/Missing';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Users from './components/User';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  User: 'User',
  Editor: 'Editor',
  Admin: 'Admin'
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Users />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App
