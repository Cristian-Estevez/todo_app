import IconButton from "./buttons/IconButton";

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
      onSubmit={handleSubmit}
      className="flex self-center gap-4 items-center"
    >
      <input
        className="rounded-lg h-10 px-2 m-2 outline outline-slate-900"
        onChange={handleChange}
        type='text'
        name='title'
        placeholder={placeHolder}
        value={inputValue}
      />

      <IconButton
        className='font-bold text-green-400 bg-white rounded-full hover:bg-slate-100 p-2 outline outline-slate-900'
        icon="add"
        type='submit'
        value={submitBtnText}
      />
    </form>
  );
}
