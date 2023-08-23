import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import PropertyService from '../services/PropertyService';
import { PropertyDTO } from '../dtos';

export class PropertyController {
  async listProperties(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const response: PropertyDTO[] = await PropertyService.search(req.query);

      if ('errors' in response) {
        return res.status(400).json({ errors: response.errors });
      }

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async getProperty(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const response: PropertyDTO = await PropertyService.get(
        parseInt(req.params.id),
      );

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async createProperty(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const response: PropertyDTO = await PropertyService.create(req.body);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async updateProperty(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const response: PropertyDTO = await PropertyService.update(
        parseInt(req.params.id),
        req.body,
      );

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteProperty(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await PropertyService.delete(parseInt(req.params.id));

      return res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}
