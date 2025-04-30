import {BrowserRouter, Route, Routes} from "react-router-dom";
import { PATH } from "./constant/constants";
import { Login, Register, NotFound, Dashboard, AuditLog } from "./views/containers";
// import AuthGuard from "./context/authGuard";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path={PATH.DASHBOARD.path} element={<Dashboard />} />
                    <Route path={PATH.AUDIT_LOG.path} element={<AuditLog />} />
                </Route>
                <Route path={PATH.LOGIN.path} element={<Login />} />
                <Route path={PATH.REGSTER.path} element={<Register />} />
                <Route path={PATH.NOT_FOUND.path} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}