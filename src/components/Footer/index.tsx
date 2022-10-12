import {
  AppBar, IconButton, Typography,
} from '@mui/material';
import { GitHub } from '@mui/icons-material/';
import * as style from './style.css';

export const Footer = () => {
  const onClick = () => {
    window.open('https://github.com/StanislavMelnik1991');
  };
  return (
    <footer className={style.wrapper}>
      <AppBar position={'static'} variant='outlined'>
        <IconButton edge={'start'} color={'inherit'} onClick={onClick}>
          <GitHub />
          <Typography variant={'h6'} style={{ paddingLeft: '0.5rem' }}>
            Stanislau Melnik 2022
          </Typography>
        </IconButton>
      </AppBar>
    </footer>
  );
};
