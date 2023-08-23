import { Property } from '../entities';
import { CustomError } from 'express-handler-errors';
import { PropertyRepository } from '../repositories';
import { PropertyDTO, UpdatePropertyDTO } from '../dtos';
import QueryString from 'qs';

export class PropertyService {
  constructor(private propertyRepository = PropertyRepository) {}

  public async create(property: Property): Promise<PropertyDTO> {
    const newProperty = this.propertyRepository.create(property);
    return this.propertyRepository.save(newProperty);
  }

  async get(id: number): Promise<PropertyDTO> {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) {
      // Throw error when no property is found
      throw new CustomError({
        code: 'PROPERTY_NOT_FOUND',
        message: 'Property not found.',
        status: 404,
      });
    }

    return property;
  }

  async update(
    id: number,
    updatedProperty: UpdatePropertyDTO,
  ): Promise<PropertyDTO> {
    if (!(await this.propertyRepository.exist({ where: { id } }))) {
      // Throw error when no property is found
      throw new CustomError({
        code: 'PROPERTY_NOT_FOUND',
        message: 'Property not found.',
        status: 404,
      });
    }

    await this.propertyRepository.update(id, updatedProperty);

    return this.propertyRepository.findOneByOrFail({ id });
  }

  async delete(id: number): Promise<{}> {
    const result = await this.propertyRepository.delete(id);

    if (result.affected == 1) {
      return {};
    }

    // Throw error when no property is found
    throw new CustomError({
      code: 'PROPERTY_NOT_FOUND',
      message: 'Property not found.',
      status: 404,
    });
  }

  async search(params: QueryString.ParsedQs): Promise<Property[]> {
    return this.propertyRepository.search({
      ...params,
      offset: Number(params.offset) || 0,
      limit: Number(params.limit) || 10,
    });
  }
}

export default new PropertyService();
