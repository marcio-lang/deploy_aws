import express from 'express';
import { router } from './routes/index';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3333;

app.use(cors({
  origin: 'http://localhost:5533'
}));

app.use('/pdfs', express.static(path.resolve(__dirname, '../pdfs')));

app.use(express.json({limit: '20mb'}));
app.use('/api', router);

app.listen(port, () => {
  console.log(`Back-end is running on http://localhost:${port}`);
});
