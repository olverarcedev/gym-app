const ModalReminderComponent = ({ selectedRadioOption, handleRadioChange }) => {
  return (
    <div className="flex justify-between">
      <label htmlFor="radioReminder">¿Deseas recibir notificaciones?</label>
      <div>
        <label className="mx-2">
          <input
            type="radio"
            value="true"
            id="radioReminderTrue"
            name="radioReminderTrue"
            checked={selectedRadioOption === 'true'}
            onChange={handleRadioChange}
          />
          Sí
        </label>
        <label className="mx-2">
          <input
            type="radio"
            value="false"
            id="radioReminderFalse"
            name="radioReminderFalse"
            checked={selectedRadioOption === 'false'}
            onChange={handleRadioChange}
          />
          No
        </label>
      </div>
    </div>
  );
};
export default ModalReminderComponent;
