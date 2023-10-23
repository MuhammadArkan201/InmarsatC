// import { Space } from "antd";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PageContent from "./components/AppContent";


function App() {
  return <div className="App" >
    
   <div> <Header/> </div>
      <div className="Space" >
      <Sidebar></Sidebar>
      <PageContent></PageContent>
      </div>
   
    

  </div>;
}
export default App;
