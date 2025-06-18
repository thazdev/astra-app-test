import { useState } from "react";

interface Props {
  onSave(datetimeISO: string): void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("pt-BR"); // 21/07/2025
  const time = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }); // 10:00
  return `${date} ${time}`; // 21/07/2025 10:00
}

export default function ScheduleMeeting({ onSave }: Props) {
  const [show, setShow] = useState(false);
  const [datetime, setDt] = useState("");
  const [isoSaved, setIso] = useState("");

  if (isoSaved) {
    return <p>Reunião marcada em {formatDate(isoSaved)}</p>;
  }

  if (!show) {
    return (
      <button data-testid="schedule-meeting" onClick={() => setShow(true)}>
        Agendar reunião
      </button>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <input
        data-testid="meeting-datetime"
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDt(e.target.value)}
      />
      <button
        data-testid="confirm-meeting"
        onClick={() => {
          const iso = new Date(datetime).toISOString();
          setIso(iso);
          onSave(iso); // caso queira usar fora
        }}
      >
        Confirmar
      </button>
    </div>
  );
}
