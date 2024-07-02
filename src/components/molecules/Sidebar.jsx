import SidebarEvent from "../atoms/SidebarEvent";
export default function Sidebar({ currentEvents }) {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Sélectionner une date pour pouvoir ajouter un évènement.</li>
          <li>Pour pouvoir supprimer un évènement, cliquer sur ce dernier.</li>
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
    </div>
  );
}
