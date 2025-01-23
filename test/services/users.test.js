const UserService = require('../../src/services/user');
const usuarios = require('../../src/database/examples/usuarios.json');
const crypto = require('crypto');

jest.mock('crypto', () => ({
  randomUUID: jest.fn()
}));

describe('UserService.create', () => {
  beforeEach(() => {
    // Clear the usuarios array before each test
    usuarios.length = 0;
  });

  it('should create a new user with a unique id', async () => {
    const mockUUID = '1234-5678-91011';
    crypto.randomUUID.mockReturnValue(mockUUID);

    const data = { name: 'John Doe', email: 'john.doe@example.com' };
    const newUser = await UserService.create(data);

    expect(newUser).toEqual({
      id: mockUUID,
      ...data
    });

    expect(usuarios).toContainEqual(newUser);
  });

  it('should add the new user to the usuarios array', async () => {
    const mockUUID = '1234-5678-91011';
    crypto.randomUUID.mockReturnValue(mockUUID);

    const data = { name: 'Jane Doe', email: 'jane.doe@example.com' };
    const newUser = await UserService.create(data);

    expect(usuarios).toHaveLength(1);
    expect(usuarios[0]).toEqual(newUser);
  });
});