import LoginPage, { metadata } from '@/app/page';
import { ProviderGlobal } from '@/components/providers/provider-global';
import { render, screen } from '@/lib/test-utils';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock('@/components/layouts/(public)/login-form/login-form', () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));

const makeSut = () => {
  return render(
    <ProviderGlobal>
      <LoginPage />
    </ProviderGlobal>,
  );
};

describe('Login Page', () => {
  describe('Base', () => {
    it('should export correct metadata', () => {
      expect(metadata.title).toBe('Login | MasterCash');
      expect(metadata.description).toBe('Login para sua conta.');
    });

    it('should render the login page', () => {
      makeSut();
    });

    it('should render logo image', () => {
      makeSut();

      const logoAltName = screen.getByAltText(/logo/i);

      expect(logoAltName).toBeInTheDocument();
    });

    it('should be render application name', () => {
      makeSut();

      const textNameApp = screen.getByText(/mastercash/i);

      expect(textNameApp).toBeInTheDocument();
    });

    it('should be render welcome title', () => {
      makeSut();

      const title = screen.getByRole('heading', {
        name: /bem vindo a plataforma/i,
      });

      expect(title).toBeInTheDocument();
    });

    it('should render description text', () => {
      makeSut();

      const subtitle = screen.getByText(/faça login para continuar/i);

      expect(subtitle).toBeInTheDocument();
    });

    it('should render login form component', () => {
      makeSut();

      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });

    it('should render login background', () => {
      const { container } = makeSut();

      const background = container.querySelector('div:last-child');

      expect(background).toBeInTheDocument();
    });
  });
});
