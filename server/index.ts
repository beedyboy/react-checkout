import express, { Express, Request, Response } from 'express';
import router from './routes/api';
import path from 'path';

const PORT = 5000;
const app: Express = express();

app.use("/api", router);
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('server started on port 5000'));
