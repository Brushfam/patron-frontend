import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import HomePage from "./pages/HomePage";
import {UserProvider} from "./context/UserContext";
import ContractWindow from "./pages/ContractWindow";
import {ContractProviderLayout} from "./layouts/ContractProviderLayout";
import CodeHashWindow from "./pages/CodeHashWindow";
import { GettingStarted } from "./pages/GettingStarted";
import { Info } from "./components/ContractComponents/Info";
import { Log } from "./components/ContractComponents/Log";
import { Code } from "./components/ContractComponents/Code";
import { ContractCaller } from "./components/ContractComponents/ContractCaller";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NavigateToTab } from "./components/NavigateToTab"

function App() {
  return (
      <UserProvider>
          <Routes>
              <Route path={"/"} element={<HomePage/>}></Route>
              <Route path={"/getting-started"} element={<GettingStarted/>}></Route>
              <Route path={"/privacy-policy"} element={<PrivacyPolicy/>}></Route>
              <Route path={"/contract"} element={<Navigate to={'/'}/>}></Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/contract/:id"} element={<NavigateToTab codeType={"contract"} tab={"code"}/>}></Route>
                  <Route path={"/contract/:id/info"} element={<ContractWindow child={<Info/>}/>}></Route>
                  <Route path={"/contract/:id/log"} element={<ContractWindow child={<Log/>} />}></Route>
                  <Route path={"/contract/:id/code"} element={<ContractWindow child={<Code/>} />}></Route>
                  <Route path={"/contract/:id/caller"} element={<ContractWindow child={<ContractCaller/>} />}></Route>
              </Route>
              <Route path={"/codeHash"} element={<Navigate to={'/'}/>}></Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/codeHash/:id"} element={<NavigateToTab codeType={"codeHash"} tab={"code"}/>}></Route>
                  <Route path={"/codeHash/:id/log"} element={<CodeHashWindow child={<Log/>} />}></Route>
                  <Route path={"/codeHash/:id/code"} element={<CodeHashWindow child={<Code/>} />}></Route>
              </Route>
              <Route path={"*"} element={<Navigate to={'/'}/>}></Route>
          </Routes>
      </UserProvider>
  );
}

export default App;
