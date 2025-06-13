import { render, screen } from '@testing-library/react';
import AuthProvider from '../provider/authProvider';
import Builds from '../pages/Builds';
import { MemoryRouter } from 'react-router-dom';

// Mock the api
jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    delete: jest.fn(),
    defaults: { headers: { common: {} } },
  },
}));

// Import the mocked api after mocking it
import api from '../services/api';

const renderWithProviders = (ui) =>
  render(
    <AuthProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthProvider>
  );

describe('Builds page', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('jwt_token', 'TestToken');

    api.get.mockReset();
    api.delete.mockReset();
  });

  it('renders builds after loading state', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: '1',
            species: 'pikachu',
            nickname: 'Sparky',
            nature: 'jolly',
            ability: 'static',
            stats: {
              hp: 35,
              attack: 55,
              defense: 40,
              specialAttack: 50,
              specialDefense: 50,
              speed: 90,
            },
            moves: ['thunderbolt', 'quick attack'],
          },
        ],
      },
    });

    renderWithProviders(<Builds />);

    // Loading indicator should appear first
    expect(screen.getByText(/loading your builds/i)).toBeInTheDocument();

    // After fetch resolves the build nickname is displayed and the loader disappears
    expect(await screen.findByText(/sparky/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading your builds/i)).not.toBeInTheDocument();
  });

  it("shows empty state when user doesn't have builds", async () => {
    api.get.mockResolvedValueOnce({ data: { data: [] } });

    renderWithProviders(<Builds />);

    expect(
      await screen.findByText(/you don't have any pokémon builds yet/i)
    ).toBeInTheDocument();
  });

  it('shows an error message when the api call fails', async () => {
    api.get.mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders(<Builds />);

    expect(
      await screen.findByText(/failed to load your pokémon builds/i)
    ).toBeInTheDocument();
  });
});
