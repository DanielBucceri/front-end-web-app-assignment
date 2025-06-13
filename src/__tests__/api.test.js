import api from '../services/api';
describe('api service', () => {
  it('should set baseURL from env or fallback', () => {
    expect(api.defaults.baseURL).toBeDefined();
  });
});
