import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars'
import { router } from './routes';

const app = express();
const port = 5533;

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(router);

app.listen(port, () => {
  console.log(`Front-end is running on http://localhost:${port}`);
});
