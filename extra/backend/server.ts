import express from 'express';
import productRouter from './controller/product';
const app = express();

const PORT = process.env.PORT || 8000;

  // Use the router
  app.use('/api', productRouter);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
  });
