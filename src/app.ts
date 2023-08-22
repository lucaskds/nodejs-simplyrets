import express from 'express';
import { propertyRoutes } from './routes';
import ErrorHandler from './ErrorHandler';

const app = express();
app.use('/properties', propertyRoutes);
app.use(ErrorHandler);

export default app;
