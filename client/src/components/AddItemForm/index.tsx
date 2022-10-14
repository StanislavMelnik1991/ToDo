import { IconButton, TextField } from '@mui/material';
import { ReactElement } from 'react';
import { ErrorType } from '../../types';
import * as style from './style.css';

type AddItemFormType = {
  error: ErrorType;
  value: string;
  button: ReactElement<any, any>;
  autoFocus?: boolean;
  message: string;
  onChangeHandler: (value: string) => void;
  onAddHandler: () => void;
  onBlur?: () => void;
  onEsc?: () => void;
};

export const AddItemForm = ({
  error, value, button, onChangeHandler, onAddHandler, onBlur, autoFocus = true, onEsc, message,
}: AddItemFormType) => {
  return (
    <div className={style.wrapper}>
      <TextField
        error={error.isError}
        helperText={error.isError ? error.message : null}
        value={value}
        type='text'
        label={`Enter ${message}`}
        title={'Type value'}
        variant={'outlined'}
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
      <IconButton
        onClick={() => { onAddHandler(); }}
        color={'primary'}>
        {button}
      </IconButton>
    </div>
  );
};
