import SidebarEvent from "../atoms/SidebarEvent";
import "./Sidebar.css";

export default function Sidebar({ currentEvents }) {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Sélectionner une date pour pouvoir ajouter un évènement.</li>
          <li>
            Pour pouvoir modifier/supprimer un évènement, glisser le sur le
            stylo/la poubelle, qui est juste en bas, ici ↓.
          </li>
        </ul>
      </div>

      <div className="app-sidebar-section">
        <h2>Evènements du jour ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event, i) => (
            <SidebarEvent key={i + "main"} event={event} />
          ))}
        </ul>
      </div>
      <img src="/assets/edit.png" id="updateEventImg" />
      <img src="/assets/trash.png" id="removeEventImg" />
    </div>
  );
}
