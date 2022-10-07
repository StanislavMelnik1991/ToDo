import { useState } from 'react';
import { ErrorType } from '../../types';
import { AddItemForm } from '../AddItemForm';
import * as style from './style.css';

type EditableSpanType = {
  title: string,
  /* error: ErrorType, */
  buttons?: JSX.Element,
  onChangeHandler: (title: string) => void,
};
export const EditableSpan = ({
  title, onChangeHandler, buttons,
}: EditableSpanType) => {
  const [error, setError] = useState<ErrorType>({ isError: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const activateEditMode = () => {
    setNewTitle(title);
    setEditMode(true);
  };
  const onAddHandler = () => {
    if (newTitle.trim() === '') {
      setError({ isError: true, message: 'Name is required' });
      return;
    }
    onChangeHandler(newTitle.trim());
    setEditMode(false);
  };
  const onEsc = () => setEditMode(false);
  const onChange = (value: string) => setNewTitle(value);
  return (editMode
    ? <AddItemForm
      value={newTitle}
      error={error}
      button='✔'
      onAddHandler={onAddHandler}
      onChangeHandler={onChange}
      onBlur={onAddHandler}
      onEsc={onEsc} />
    : <>
      <span
        className={style.wrapper}
        onDoubleClick={activateEditMode}>
        {title}
      </span>
      {buttons}
    </>
  );
};
