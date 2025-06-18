type Props = {
  onConfirm: (iso: string) => void;
  onClose: () => void;
};

export default function MeetingModal({ onConfirm, onClose }: Props) {
  const [value, setValue] = useState("");

  return (
    <dialog open style={{ padding: 16 }}>
      <h3>Agendar reunião</h3>

      <input
        data-testid="meeting-datetime"
        type="datetime-local"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div style={{ marginTop: 12 }}>
        <button
          data-testid="confirm-meeting"
          onClick={() => value && onConfirm(value)}
        >
          Confirmar
        </button>
        <button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancelar
        </button>
      </div>
    </dialog>
  );
}
