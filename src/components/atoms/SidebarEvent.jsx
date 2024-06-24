import { formatDate } from "@fullcalendar/core";
export default function SidebarEvent({ event }) {
  return (
    <li key={event.id + "li"}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
