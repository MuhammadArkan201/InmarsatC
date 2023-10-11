import { Route, Routes} from "react-router-dom"
import TestTerminal from "../Pages/TestTerminal";

function AppRoutes () {
    return (
        
            <Routes>
                <Route path="/TestTerminal" element={<TestTerminal/>} />
            </Routes>
        
    )
}
export default AppRoutes;