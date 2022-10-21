import * as style from './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Routers } from './router';

export const App = () => {
  return (
    <div className={style.App}>
      <Header />
      <Routers />
      <Footer />
    </div>
  );
};
