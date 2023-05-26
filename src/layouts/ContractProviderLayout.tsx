import { Outlet } from 'react-router-dom';
import {ContractProvider} from "../context/ContractContext";

export const ContractProviderLayout = () => (
    <ContractProvider>
        <Outlet />
    </ContractProvider>
);