import RegisterPage, { metadata } from '@/app/(public)/cadastrar/page';
import { ProviderGlobal } from '@/components/providers/provider-global';
import { render, screen } from '@/lib/test-utils';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const makeSut = () => {
  return render(
    <ProviderGlobal>
      <RegisterPage />
    </ProviderGlobal>,
  );
};

describe('Register Page', () => {
  describe('Base', () => {
    it('should render the register page', () => {
      makeSut();
    });

    it('should export correct metadata', () => {
      expect(metadata.title).toBe('Criar conta');
      expect(metadata.description).toBe('Criar conta');
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

    it('should be render title', () => {
      makeSut();

      const title = screen.getByRole('heading', {
        name: /vamos criar sua conta/i,
      });

      expect(title).toBeInTheDocument();
    });

    it('should be render back button', () => {
      makeSut();

      const link = screen.getByRole('link', {
        name: /voltar/i,
      });

      expect(link).toHaveAttribute('href', '/');
    });
  });
});
