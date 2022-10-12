import { Menu } from '@mui/icons-material';
import {
  AppBar, Button, IconButton, Toolbar, Typography,
} from '@mui/material';

export const Header = () => {
  return (
    <header>
      <AppBar position={'static'}>
        <Toolbar >
          <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>
            News
          </Typography>
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};
