const supertest = require('supertest');
const { app } = require('../Server.js');
const request = supertest(app);


const authMock = {
  userRegister: jest.fn(),
};


describe('User Authentication', () => {


  beforeEach(async )

  it('should register a new user', async () => {
    const response = await request
      .post('/user/register')
      .send({
        userName: 'moses',
        email: 'test3@example.com',
        password: 'test123',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should fail to register an existing user', async () => {
    const response = await request
      .post('/user/register')
      .send({
        userName: "moses",
        email: "test3@example.com",
        password: "test123"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should login with valid credentials', async () => {
    const response = await request
      .post('/user/login')
      .send({
        email: 'test3@example.com',
        password: 'test123',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should fail to login with invalid credentials', async () => {
    const response = await request
      .post('/user/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  // Add more test cases for logout and other authentication-related routes if needed
});
