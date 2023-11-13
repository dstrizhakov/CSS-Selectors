import './index.html';
import './index.scss';
import Game from './modules/Game';
import { levels } from './modules/levels';

const game = new Game(levels);

game.start();
