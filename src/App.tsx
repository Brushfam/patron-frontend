import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import HomePage from "./pages/HomePage";
import {Profile} from "./pages/Profile";
import {UserProvider} from "./context/UserContext";
import {RequireAuth} from "./components/Wrappers/RequireAuth";
import ContractWindow from "./pages/ContractWindow";
import {ContractProviderLayout} from "./layouts/ContractProviderLayout";
import CodeHashWindow from "./pages/CodeHashWindow";
import { GettingStarted } from "./pages/GettingStarted";
import Login from "./pages/Login";
import { Info } from "./components/ContractComponents/Info";
import { Log } from "./components/ContractComponents/Log";
import { Code } from "./components/ContractComponents/Code";
import { ContractCaller } from "./components/ContractComponents/ContractCaller";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NavigateToTab } from "./components/NavigateToTab"
import { LocalContractCaller } from "./pages/LocalContractCaller";
import { Diagnostic } from "./components/ContractComponents/Diagnostic";


function App() {
  return (
      <UserProvider>
          <Routes>
              <Route path={"/"} element={<HomePage/>}></Route>
              <Route path={"/getting-started"} element={<GettingStarted/>}></Route>
              <Route path={"/profile"} element={<RequireAuth children={<Profile />}/>}></Route>
              <Route path={"/contract"} element={<Navigate to={'/'}/>}></Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/contract/:id"} element={<NavigateToTab codeType={"contract"} tab={"code"}/>}></Route>
                  <Route path={"/contract/:id/info"} element={<ContractWindow child={<Info/>}/>}></Route>
                  <Route path={"/contract/:id/log"} element={<ContractWindow child={<Log/>} />}></Route>
                  <Route path={"/contract/:id/code"} element={<ContractWindow child={<Code/>} />}></Route>
                  <Route path={"/contract/:id/diagnostic"} element={<ContractWindow child={<Diagnostic/>} />}></Route>
                  <Route path={"/contract/:id/caller"} element={<ContractWindow child={<ContractCaller/>} />}></Route>
              </Route>
              <Route path={"/codeHash"} element={<Navigate to={'/'}/>}></Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/codeHash/:id"} element={<NavigateToTab codeType={"codeHash"} tab={"code"}/>}></Route>
                  <Route path={"/codeHash/:id/log"} element={<CodeHashWindow child={<Log/>} />}></Route>
                  <Route path={"/codeHash/:id/code"} element={<CodeHashWindow child={<Code/>} />}></Route>
                  <Route path={"/codeHash/:id/diagnostic"} element={<CodeHashWindow child={<Diagnostic/>} />}></Route>
              </Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/failedBuildSession/:id"} element={<NavigateToTab codeType={"failedBuildSession"} tab={"code"}/>}></Route>
                  <Route path={"/failedBuildSession/:id/log"} element={<CodeHashWindow child={<Log/>} failed={true}/>}></Route>
                  <Route path={"/failedBuildSession/:id/code"} element={<CodeHashWindow child={<Code/>} failed={true}/>}></Route>
                  <Route path={"/failedBuildSession/:id/diagnostic"} element={<CodeHashWindow child={<Diagnostic/>} failed={true}/>}></Route>
              </Route>
              <Route element={<ContractProviderLayout/>}>
                  <Route path={"/local-contract-caller"} element={<LocalContractCaller/>}></Route>
              </Route>
              <Route path={"/privacy-policy"} element={<PrivacyPolicy/>}></Route>
              <Route path={"/login"} element={<Login/>}></Route>
              <Route path={"*"} element={<Navigate to={'/'}/>}></Route>
          </Routes>
      </UserProvider>
  );
}

export default App;
