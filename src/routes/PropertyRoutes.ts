import express from 'express';
import { body, param, query } from 'express-validator';
import bodyParser from 'body-parser';
import { PropertyController } from '../controllers';

export const propertyRoutes = express.Router();

propertyRoutes.use(bodyParser.json());
const propertyController = new PropertyController();

propertyRoutes.get(
  '/',
  [
    // Add validation rules using query() function
    query('address').optional().isString(),
    query('minBedrooms').optional().isInt({ min: 0 }),
    query('maxBedrooms').optional().isInt({ min: 0 }),
    query('minBathrooms').optional().isInt({ min: 0 }),
    query('maxBathrooms').optional().isInt({ min: 0 }),
    query('minPrice').optional().isInt({ min: 0 }),
    query('maxPrice').optional().isInt({ min: 0 }),
    query('type').optional().isString(),
    query('limit').optional().isInt({ min: 5, max: 20 }),
    query('offset').optional().isInt({ min: 0 }),
  ],
  propertyController.listProperties,
);

propertyRoutes.get(
  '/:id',
  [
    // Validate the 'id' parameter
    param('id').isInt().toInt(),
  ],
  propertyController.getProperty,
);

propertyRoutes.post(
  '/',
  [
    // Validate the request body for property creation
    body('address').isString(),
    body('type').isString(),
    body('price').isInt({ min: 0 }),
    body('bedrooms').isInt({ min: 0 }),
    body('bathrooms').isInt({ min: 0 }),
  ],
  propertyController.createProperty,
);

propertyRoutes.put(
  '/:id',
  [
    // Validate the 'id' parameter
    param('id').isInt().toInt(),
    // Validate the request body for property updates
    body('address').optional().isString(),
    body('type').optional().isString(),
    body('price').optional().isInt({ min: 0 }),
    body('bedrooms').optional().isInt({ min: 0 }),
    body('bathrooms').optional().isInt({ min: 0 }),
  ],
  propertyController.updateProperty,
);

propertyRoutes.delete(
  '/:id',
  [
    // Validate the 'id' parameter
    param('id').isInt().toInt(),
  ],
  propertyController.deleteProperty,
);
