import { ErrorType } from '../../types';
import * as style from './style.css';

type AddItemFormType = {
  error: ErrorType;
  value: string;
  button: string;
  autoFocus?: boolean;
  onChangeHandler: (value: string) => void;
  onAddHandler: () => void;
  onBlur?: () => void;
  onEsc?: () => void;
};

export const AddItemForm = ({
  error, value, button, onChangeHandler, onAddHandler, onBlur, autoFocus = true, onEsc,
}: AddItemFormType) => {
  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <input
          className={error.isError ? style.error : ''}
          type="text"
          value={value}
          autoFocus={autoFocus}
          onChange={(ev) => {
            onChangeHandler(ev.currentTarget.value);
          }}
          onKeyDown={(ev) => {
            (ev.code === 'Enter' || ev.code === 'NumpadEnter') && onAddHandler();
            (ev.code === 'Escape') && onEsc && onEsc();
          }}
          onBlur={onBlur}
        />
        <button
          onClick={() => { onAddHandler(); }}
          className={error.isError ? style.error : ''}>
          {button}
        </button>
      </div>
      {error.isError && <div className={style.error_message}>{error.message}</div>}
    </div>
  );
};
