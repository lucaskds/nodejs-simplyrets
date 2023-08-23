import request from 'supertest';
import app from '../../app';
import AppDataSource, { seedDb } from '../../dataSource';

describe('propertyRoutes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedDb();
  });

  describe('GET /properties', () => {
    it('should return 10 first properties', async () => {
      const response = await request(app).get('/properties');

      expect(response.body).toEqual([
        {
          id: 1,
          address: '74434 East Sweet Bottom Br #18393',
          bedrooms: 2,
          bathrooms: 5,
          price: 20714261,
          type: null,
        },
        {
          id: 2,
          address: '8369 West MAJESTY STREET Path #1765',
          bedrooms: 3,
          bathrooms: 6,
          price: 9375751,
          type: null,
        },
        {
          id: 3,
          address: '90678 South VELLUM Extension #6A2',
          bedrooms: 5,
          bathrooms: 4,
          price: 12104869,
          type: null,
        },
        {
          id: 4,
          address: '34149 East GRANICUS Mews #I-7',
          bedrooms: 6,
          bathrooms: 2,
          price: 7857291,
          type: 'Condominium',
        },
        {
          id: 5,
          address: '21366 South Creek Mist Bluff #I-7',
          bedrooms: 2,
          bathrooms: 3,
          price: 13685168,
          type: 'Condominium',
        },
        {
          id: 6,
          address: '89810 East Running Doe Knoll #709S',
          bedrooms: 5,
          bathrooms: 1,
          price: 20764446,
          type: 'Townhouse',
        },
        {
          id: 7,
          address: '96294 West BEAD GRASS TER Gate #4059',
          bedrooms: 1,
          bathrooms: 5,
          price: 17450668,
          type: null,
        },
        {
          id: 8,
          address: '39781 West Old Woman Springs Rd Drive #APT 2B',
          bedrooms: 6,
          bathrooms: 2,
          price: 10114945,
          type: 'Condominium',
        },
        {
          id: 9,
          address: '172 North British Colony Boulevard #27',
          bedrooms: 4,
          bathrooms: 5,
          price: 9014063,
          type: null,
        },
        {
          id: 10,
          address: '22690 West Hunters Hollow Garden #LPH-1',
          bedrooms: 4,
          bathrooms: 2,
          price: 9199166,
          type: 'Townhouse',
        },
      ]);
    });

    it('should return first 7 properties after the 34th property', async () => {
      const response = await request(app).get('/properties?offset=34&limit=7');

      expect(response.body).toEqual([
        {
          id: 35,
          address: '89419 North US HWY. 301 Pl #527-2',
          bedrooms: 6,
          bathrooms: 6,
          price: 21854919,
          type: 'Condominium',
        },
        {
          id: 36,
          address: '70446 West ARABIAN WAY Oval #1765',
          bedrooms: 2,
          bathrooms: 4,
          price: 6219566,
          type: 'Townhouse',
        },
        {
          id: 37,
          address: '31045 South Maggiore Ln. Row #APT 2B',
          bedrooms: 4,
          bathrooms: 1,
          price: 18879583,
          type: 'SingleFamilyResidence',
        },
        {
          id: 38,
          address: '32738 South VISTA MADERA Lane #F16',
          bedrooms: 2,
          bathrooms: 6,
          price: 2893021,
          type: 'Townhouse',
        },
        {
          id: 39,
          address: '30662 South Perry Hill Falls #205-C',
          bedrooms: 5,
          bathrooms: 3,
          price: 20128158,
          type: null,
        },
        {
          id: 40,
          address: '76520 North MAXEY HILL Boulevard #1795',
          bedrooms: 5,
          bathrooms: 1,
          price: 9878825,
          type: 'Townhouse',
        },
        {
          id: 41,
          address: '2976 North British Colony Lndg #12306',
          bedrooms: 3,
          bathrooms: 5,
          price: 17236623,
          type: 'Townhouse',
        },
      ]);
    });

    it('should filter by minBedrooms', async () => {
      const response = await request(app).get(
        '/properties?limit=5&minBedrooms=4',
      );

      expect(response.body[0]).toEqual({
        id: 3,
        address: '90678 South VELLUM Extension #6A2',
        bedrooms: 5,
        bathrooms: 4,
        price: 12104869,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by maxBedrooms', async () => {
      const response = await request(app).get(
        '/properties?limit=5&maxBedrooms=4',
      );

      expect(response.body[0]).toEqual({
        id: 1,
        address: '74434 East Sweet Bottom Br #18393',
        bedrooms: 2,
        bathrooms: 5,
        price: 20714261,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by exact number of bedrooms', async () => {
      const response = await request(app).get(
        '/properties?limit=5&minBedrooms=4&maxBedrooms=4',
      );

      expect(response.body[0]).toEqual({
        id: 9,
        address: '172 North British Colony Boulevard #27',
        bedrooms: 4,
        bathrooms: 5,
        price: 9014063,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by minBathrooms', async () => {
      const response = await request(app).get(
        '/properties?limit=5&minBathrooms=4',
      );

      expect(response.body[0]).toEqual({
        id: 1,
        address: '74434 East Sweet Bottom Br #18393',
        bedrooms: 2,
        bathrooms: 5,
        price: 20714261,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by maxBathrooms', async () => {
      const response = await request(app).get(
        '/properties?limit=5&maxBathrooms=4',
      );

      expect(response.body[0]).toEqual({
        id: 3,
        address: '90678 South VELLUM Extension #6A2',
        bedrooms: 5,
        bathrooms: 4,
        price: 12104869,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by exact number of bathrooms', async () => {
      const response = await request(app).get(
        '/properties?limit=5&minBathrooms=4&maxBathrooms=4',
      );

      expect(response.body[0]).toEqual({
        id: 3,
        address: '90678 South VELLUM Extension #6A2',
        bedrooms: 5,
        bathrooms: 4,
        price: 12104869,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by minPrice', async () => {
      const response = await request(app).get(
        '/properties?limit=5&minPrice=12000000',
      );

      expect(response.body[0]).toEqual({
        id: 1,
        address: '74434 East Sweet Bottom Br #18393',
        bedrooms: 2,
        bathrooms: 5,
        price: 20714261,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by maxPrice', async () => {
      const response = await request(app).get(
        '/properties?limit=5&maxPrice=12000000',
      );

      expect(response.body[0]).toEqual({
        id: 2,
        address: '8369 West MAJESTY STREET Path #1765',
        bedrooms: 3,
        bathrooms: 6,
        price: 9375751,
        type: null,
      });
      expect(response.body.lengh == 5);
    });

    it('should filter by exact price', async () => {
      const response = await request(app).get(
        '/properties?limit=5&minPrice=9199166&maxPrice=9199166',
      );

      expect(response.body[0]).toEqual({
        id: 10,
        address: '22690 West Hunters Hollow Garden #LPH-1',
        bedrooms: 4,
        bathrooms: 2,
        price: 9199166,
        type: 'Townhouse',
      });
      expect(response.body.lengh == 3);
    });

    it('should filter by address', async () => {
      const response = await request(app).get(
        '/properties?limit=5&address=east calle sol row',
      );

      expect(response.body).toEqual([
        {
          id: 30,
          address: '18652 East CALLE SOL Row #527-2',
          bedrooms: 3,
          bathrooms: 3,
          price: 17997931,
          type: 'Townhouse',
        },
        {
          id: 72,
          address: '18652 East CALLE SOL Row #527-2',
          bedrooms: 3,
          bathrooms: 3,
          price: 17997931,
          type: 'Townhouse',
        },
        {
          id: 114,
          address: '18652 East CALLE SOL Row #527-2',
          bedrooms: 3,
          bathrooms: 3,
          price: 17997931,
          type: 'Townhouse',
        },
      ]);
    });

    it('should filter by type', async () => {
      const response = await request(app).get(
        '/properties?limit=5&type=condominium',
      );

      expect(response.body).toEqual([
        {
          id: 4,
          address: '34149 East GRANICUS Mews #I-7',
          bedrooms: 6,
          bathrooms: 2,
          price: 7857291,
          type: 'Condominium',
        },
        {
          id: 5,
          address: '21366 South Creek Mist Bluff #I-7',
          bedrooms: 2,
          bathrooms: 3,
          price: 13685168,
          type: 'Condominium',
        },
        {
          id: 8,
          address: '39781 West Old Woman Springs Rd Drive #APT 2B',
          bedrooms: 6,
          bathrooms: 2,
          price: 10114945,
          type: 'Condominium',
        },
        {
          id: 14,
          address: '63336 East EVERETT PL Mews #E-1002',
          bedrooms: 4,
          bathrooms: 6,
          price: 16194569,
          type: 'Condominium',
        },
        {
          id: 16,
          address: '36992 West Georgetown(lot 18) Boulevard #C 104',
          bedrooms: 4,
          bathrooms: 6,
          price: 6070556,
          type: 'Condominium',
        },
      ]);
    });

    it('should return Property by id', async () => {
      const response = await request(app).get('/properties/92');

      expect(response.body).toEqual({
        id: 92,
        address: '39781 West Old Woman Springs Rd Drive #APT 2B',
        price: 10114945,
        bedrooms: 6,
        bathrooms: 2,
        type: 'Condominium',
      });
    });

    it('should return 404 status on not found property', async () => {
      const response = await request(app).get('/properties/200');

      expect(response.body.message).toBe('Property not found.');
      expect(response.status).toBe(404);
    });

    it('should return invalid :id param', async () => {
      const response = await request(app).get('/properties/a');

      expect(response.body).toEqual({
        errors: [
          {
            type: 'field',
            value: 'a',
            msg: 'Invalid value',
            path: 'id',
            location: 'params',
          },
        ],
      });
    });
  });

  describe('POST /properties', () => {
    it('should create a Property', async () => {
      const propertyData = {
        address: '123 Test St',
        type: 'Apartment',
        price: 200000,
        bedrooms: 3,
        bathrooms: 2,
      };
      const response = await request(app)
        .post('/properties')
        .send(propertyData);

      expect(response.body).toEqual({
        id: 127,
        address: '123 Test St',
        type: 'Apartment',
        price: 200000,
        bedrooms: 3,
        bathrooms: 2,
      });
    });

    it('should return invalid values', async () => {
      const propertyData = {
        address: 332,
        type: 22,
        price: -1,
        bedrooms: 'a',
        bathrooms: 'b',
      };
      const response = await request(app)
        .post('/properties')
        .send(propertyData);

      expect(response.body).toEqual({
        errors: [
          {
            type: 'field',
            value: 332,
            msg: 'Invalid value',
            path: 'address',
            location: 'body',
          },
          {
            type: 'field',
            value: 22,
            msg: 'Invalid value',
            path: 'type',
            location: 'body',
          },
          {
            type: 'field',
            value: -1,
            msg: 'Invalid value',
            path: 'price',
            location: 'body',
          },
          {
            type: 'field',
            value: 'a',
            msg: 'Invalid value',
            path: 'bedrooms',
            location: 'body',
          },
          {
            type: 'field',
            value: 'b',
            msg: 'Invalid value',
            path: 'bathrooms',
            location: 'body',
          },
        ],
      });
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /properties', () => {
    it('should update the address of a Property', async () => {
      const response = await request(app)
        .put('/properties/45')
        .send({ address: '123 Test St' });

      expect(response.body).toEqual({
        id: 45,
        address: '123 Test St',
        price: 12104869,
        bedrooms: 5,
        bathrooms: 4,
        type: null,
      });
    });

    it('should update the type of a Property', async () => {
      const response = await request(app)
        .put('/properties/45')
        .send({ type: 'Apartment' });

      expect(response.body).toEqual({
        id: 45,
        address: '123 Test St',
        price: 12104869,
        bedrooms: 5,
        bathrooms: 4,
        type: 'Apartment',
      });
    });

    it('should update the price of a Property', async () => {
      const response = await request(app)
        .put('/properties/45')
        .send({ price: 200000 });

      expect(response.body).toEqual({
        id: 45,
        address: '123 Test St',
        price: 200000,
        bedrooms: 5,
        bathrooms: 4,
        type: 'Apartment',
      });
    });

    it('should update the bedrooms of a Property', async () => {
      const response = await request(app)
        .put('/properties/45')
        .send({ bedrooms: 3 });

      expect(response.body).toEqual({
        id: 45,
        address: '123 Test St',
        price: 200000,
        bedrooms: 3,
        bathrooms: 4,
        type: 'Apartment',
      });
    });

    it('should update the bathrooms of a Property', async () => {
      const response = await request(app)
        .put('/properties/45')
        .send({ bathrooms: 2 });

      expect(response.body).toEqual({
        id: 45,
        address: '123 Test St',
        price: 200000,
        bedrooms: 3,
        bathrooms: 2,
        type: 'Apartment',
      });
    });

    it('should return 404 status on not found property', async () => {
      const response = await request(app)
        .put('/properties/200')
        .send({ bathrooms: 2 });

      expect(response.body.message).toBe('Property not found.');
      expect(response.status).toBe(404);
    });

    it('should return invalid values', async () => {
      const propertyData = {
        address: 332,
        type: 22,
        price: -1,
        bedrooms: 'a',
        bathrooms: 'b',
      };
      const response = await request(app)
        .put('/properties/a')
        .send(propertyData);

      expect(response.body).toEqual({
        errors: [
          {
            type: 'field',
            value: 'a',
            msg: 'Invalid value',
            path: 'id',
            location: 'params',
          },
          {
            type: 'field',
            value: 332,
            msg: 'Invalid value',
            path: 'address',
            location: 'body',
          },
          {
            type: 'field',
            value: 22,
            msg: 'Invalid value',
            path: 'type',
            location: 'body',
          },
          {
            type: 'field',
            value: -1,
            msg: 'Invalid value',
            path: 'price',
            location: 'body',
          },
          {
            type: 'field',
            value: 'a',
            msg: 'Invalid value',
            path: 'bedrooms',
            location: 'body',
          },
          {
            type: 'field',
            value: 'b',
            msg: 'Invalid value',
            path: 'bathrooms',
            location: 'body',
          },
        ],
      });
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /properties', () => {
    it('should delete a Property', async () => {
      const response = await request(app).delete('/properties/45');

      expect(response.status).toBe(204);

      const response404 = await request(app).get('/properties/45');
      expect(response404.body.message).toBe('Property not found.');
      expect(response404.status).toBe(404);
    });

    it('should return 404 status on not found property', async () => {
      const response = await request(app).delete('/properties/200');

      expect(response.body.message).toBe('Property not found.');
      expect(response.status).toBe(404);
    });

    it('should return invalid :id param param', async () => {
      const response = await request(app).delete('/properties/a');

      expect(response.body).toEqual({
        errors: [
          {
            type: 'field',
            value: 'a',
            msg: 'Invalid value',
            path: 'id',
            location: 'params',
          },
        ],
      });
    });
  });
});
