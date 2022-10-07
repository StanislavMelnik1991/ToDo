import { ErrorType } from '../../types';
import * as style from './style.css';

type AddItemFormType = {
  error: ErrorType;
  value: string;
  onChangeHandler: (value: string) => void;
  onAddHandler: () => void;
};

export const AddItemForm = ({
  error, value, onChangeHandler, onAddHandler,
}: AddItemFormType) => {
  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <input
          className={error.isError ? style.error : ''}
          type="text"
          value={value}
          onChange={(ev) => {
            onChangeHandler(ev.currentTarget.value);
          }}
          onKeyDown={(ev) => {
            (ev.code === 'Enter') && onAddHandler();
          }}
        />
        <button
          onClick={() => { onAddHandler(); }}
          className={error.isError ? style.error : ''}>
          +
        </button>
      </div>
      {error.isError && <div className={style.error_message}>{error.message}</div>}
    </div>
  );
};
