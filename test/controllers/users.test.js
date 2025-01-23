const request = require('supertest');
const app = require('../../src/app');
const UserService = require('../../src/services/user');
const { describe, test, expect, mock } = require('@jest/globals');
const { intersection } = require('zod');

jest.mock('../../src/services/user');

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should respond with a list of users', async () => {
      const mockUsers = [
        { id: '1a', name: 'Juan' },
        { id: '2b', name: 'Pedro' },
      ];

      UserService.getAll.mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      // console.log('test', response.body, response.statusCode);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });
  });
});
