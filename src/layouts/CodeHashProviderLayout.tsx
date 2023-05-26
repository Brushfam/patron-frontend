import { Outlet } from 'react-router-dom';
import {CodeHashProvider} from "../context/CodeHashContext";

export const CodeHashProviderLayout = () => (
    <CodeHashProvider>
        <Outlet />
    </CodeHashProvider>
);