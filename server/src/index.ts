import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { convertRouter } from './routes/convert';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', convertRouter);

const PORT = parseInt(process.env.PORT ?? '3001', 10);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
