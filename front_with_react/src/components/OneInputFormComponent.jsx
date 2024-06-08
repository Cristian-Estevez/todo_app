export default function OneInputFormComponent({
  handleSubmit,
  handleChange,
  inputValue,
  editingTask,
  placeHolder
}) {
  const submitBtnText = editingTask ? 'Save' : 'Add';

  return (
    <form
      id='form'
      onSubmit={handleSubmit}
      styles='text-alignt: center;'
    >
      <div
        className='form-row'
        styles=' width: 95%;'
      >
        <div
          className='form-group'
          id='form-inputbox'
        >
          <input
            onChange={handleChange}
            id='folder-name'
            className='form-control'
            type='text'
            name='title'
            placeholder={placeHolder}
            value={inputValue}
          />
        </div>
        <div className='form-group form-md-3'>
          <input
            id='add-folder'
            className='btn btn-primary border-secondary form-control'
            type='submit'
            value={submitBtnText}
          />
        </div>
      </div>
    </form>
  );
}
