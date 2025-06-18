import { useState } from "react";
import { useParams } from "react-router-dom";
import ScheduleMeeting from "../components/ScheduleMeeting";

export default function Contract() {
  const { id } = useParams();
  const [meetingISO, setMeetingISO] = useState("");

  return (
    <div>
      <h1>Contrato</h1>
      <p data-testid="success">Cadastrado com sucesso</p>
      <p>Visualizando contrato #{id}</p>

      {/* Agenda a reunião – o próprio ScheduleMeeting mostra o texto final */}
      <ScheduleMeeting onSave={setMeetingISO} />
    </div>
  );
}
