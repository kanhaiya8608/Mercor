
import NavBar from './components/NavBar'; 
import './App.css'
import SideBar from './components/SideBar.jsx';
import Kanban from './components/Kanban';
import Header from './components/Header';
import ButtonRow from './components/ButtonRow.jsx';

function App() {
  return (
    <div id="app" style={{ height: "auto", display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <div>
          <NavBar />
          <Header/>
          <ButtonRow/>
          <Kanban />
        </div>
      </div>
    </div>
  );
}

export default App;