import { Space } from "antd";
import Logo from "./Logo";
import ToggleThemeButton from "../ToggleThemeButton";
import "../../App.css";


function Header (){
    return <div className="Header">
        <Logo/>
        <Space>
        </Space>
        <Space> <ToggleThemeButton/> </Space>
    </div>
}
export default Header;