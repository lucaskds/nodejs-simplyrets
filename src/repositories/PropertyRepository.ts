import { Property } from '../entities';
import { FilterDTO, PropertyDTO } from '../dtos';
import AppDataSource from '../dataSource';

export const PropertyRepository = AppDataSource.getRepository(Property).extend({
  // Add custom repository method for improved filters
  async search(filters: FilterDTO): Promise<PropertyDTO[]> {
    const queryBuilder = this.createQueryBuilder('property').select([
      'property.id as id',
      'property.address as address',
      'property.bedrooms as bedrooms',
      'property.bathrooms as bathrooms',
      'property.price as price',
      'property.type as type',
    ]);

    if (filters.address) {
      queryBuilder.andWhere('property.address LIKE :address', {
        address: `%${filters.address}%`,
      });
    }

    if (filters.minBedrooms) {
      queryBuilder.andWhere('property.bedrooms >= :minBedrooms', {
        minBedrooms: filters.minBedrooms,
      });
    }

    if (filters.maxBedrooms) {
      queryBuilder.andWhere('property.bedrooms <= :maxBedrooms', {
        maxBedrooms: filters.maxBedrooms,
      });
    }

    if (filters.minBathrooms) {
      queryBuilder.andWhere('property.bathrooms >= :minBathrooms', {
        minBathrooms: filters.minBathrooms,
      });
    }

    if (filters.maxBathrooms) {
      queryBuilder.andWhere('property.bathrooms <= :maxBathrooms', {
        maxBathrooms: filters.maxBathrooms,
      });
    }

    if (filters.minPrice) {
      queryBuilder.andWhere('property.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice) {
      queryBuilder.andWhere('property.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    if (filters.type) {
      queryBuilder.andWhere('property.type = :type COLLATE NOCASE', {
        type: filters.type,
      });
    }

    queryBuilder.orderBy('id').skip(filters.offset).take(filters.limit);

    return queryBuilder.execute();
  },
});
