
import NavBar from './components/NavBar'; 
import './App.css'
import SideBar from './components/SideBar.jsx';
import Kanban from './components/Kanban';

function App() {
  return (
    <div id="app" style={{ height: "auto", display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <main>
          <NavBar />
          <Kanban />
        </main>
      </div>
    </div>
  );
}

export default App;