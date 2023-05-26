import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import HomePage from "./pages/HomePage";
import {Profile} from "./pages/Profile";
import {UserProvider} from "./context/UserContext";
import Login from "./pages/Login";
import {RequireAuth} from "./components/Wrappers/RequireAuth";
import ContractWindow from "./pages/ContractWindow";
import {ContractProviderLayout} from "./layouts/ContractProviderLayout";
import {RequireUnauth} from "./components/Wrappers/RequireUnauth";
import {CodeHashProviderLayout} from "./layouts/CodeHashProviderLayout";
import CodeHashWindow from "./pages/CodeHashWindow";


function App() {
  return (
      <UserProvider>
          <Routes>
              <Route path={"/"} element={<HomePage/>}></Route>
              <Route path={"/login"}  element={<Login/>} />
              <Route path={"/profile"} element={<RequireAuth children={<Profile />}/>}></Route>
              <Route path={"/contract"} element={<Navigate to={'/'}/>}></Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/contract/:id"} element={<ContractWindow />}></Route>
              </Route>
              <Route path={"/codeHash"} element={<Navigate to={'/'}/>}></Route>
              <Route element={<CodeHashProviderLayout/>}>
                  <Route path={"/codeHash/:id"} element={<CodeHashWindow />}></Route>
              </Route>
              <Route path={"*"} element={<Navigate to={'/'}/>}></Route>
          </Routes>
      </UserProvider>
  );
}

export default App;
