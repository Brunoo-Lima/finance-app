import { render, screen } from '@/lib/test-utils';
import { ProviderGlobal } from '@/components/providers/provider-global';
import { LoginForm } from '@/components/layouts/(public)/login-form/login-form';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { waitFor } from '@testing-library/react';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock('next/link', () => {
  const MockedLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };

  MockedLink.displayName = 'MockedNextLink';

  return MockedLink;
});

const loginServiceMock = jest.fn();
jest.mock('@/hooks/use-auth');

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const makeSut = () => {
  (useAuth as jest.Mock).mockReturnValue({
    loginService: loginServiceMock,
  });

  render(
    <ProviderGlobal>
      <LoginForm />
    </ProviderGlobal>,
  );
};

describe('Login Form', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Base', () => {
    it('should render the login form', () => {
      makeSut();
    });

    it('should render the form fields', () => {
      makeSut();

      const emailInput = screen.getByLabelText(/e-mail/i);
      const passwordInput = screen.getByLabelText(/senha/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should render register message', () => {
      render(<LoginForm />);
      const textRegister = screen.getByText(/não tem conta ainda/i);

      expect(textRegister).toBeInTheDocument();
    });

    it('should render forgot password message', () => {
      makeSut();

      const textForgotPassword = screen.getByText(/esqueci a senha/i);

      expect(textForgotPassword).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should allow typing email', async () => {
      makeSut();

      const emailInput = screen.getByLabelText(/e-mail/i);

      await user.type(emailInput, 'test@email.com');

      expect(emailInput).toHaveValue('test@email.com');
    });

    it('should show validation errors', async () => {
      makeSut();

      const submitButton = screen.getByRole('button', { name: /entrar/i });

      const inputEmail = screen.getByLabelText(/e-mail/i);
      const inputPassword = screen.getByLabelText(/senha/i);

      await user.type(inputEmail, ' ');
      await user.type(inputPassword, ' ');

      await user.click(submitButton);

      expect(await screen.findByText(/obrigatório/i)).toBeInTheDocument();
      expect(await screen.findByText(/caracteres/i)).toBeInTheDocument();
    });

    it('should allow typing password', async () => {
      makeSut();

      const passwordInput = screen.getByLabelText(/senha/i);

      await user.type(passwordInput, '123456');

      expect(passwordInput).toHaveValue('123456');
    });

    it('should send remember as true when checked', async () => {
      makeSut();

      await user.click(screen.getByLabelText(/lembrar-me/i));

      await user.type(screen.getByLabelText(/e-mail/i), 'teste@email.com');

      await user.type(screen.getByLabelText(/senha/i), '123456');

      await user.click(screen.getByRole('button', { name: /entrar/i }));

      expect(loginServiceMock).toHaveBeenCalledWith(
        'teste@email.com',
        '123456',
        true,
      );
    });

    it('should disable button while submitting', async () => {
      loginServiceMock.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      makeSut();

      const inputEmail = screen.getByLabelText(/e-mail/i);
      const inputPassword = screen.getByLabelText(/senha/i);

      await user.type(inputEmail, 'teste@email.com');
      await user.type(inputPassword, '123456');

      const button = screen.getByRole('button', { name: /entrar/i });

      await user.click(button);

      expect(button).toBeDisabled();
    });

    it('should not call loginService when form is invalid', async () => {
      makeSut();

      const button = screen.getByRole('button', { name: /entrar/i });

      await user.click(button);

      await waitFor(() => {
        expect(loginServiceMock).not.toHaveBeenCalled();
      });
    });

    it('should call loginService with correct values', async () => {
      makeSut();

      await user.type(screen.getByLabelText(/e-mail/i), 'teste@email.com');

      await user.type(screen.getByLabelText(/senha/i), '123456');

      await user.click(screen.getByRole('button', { name: /entrar/i }));

      expect(loginServiceMock).toHaveBeenCalledWith(
        'teste@email.com',
        '123456',
        false,
      );
    });

    it('should show error toast when login fails', async () => {
      loginServiceMock.mockRejectedValueOnce(new Error('Invalid'));

      makeSut();

      await user.type(screen.getByLabelText(/e-mail/i), 'teste@email.com');
      await user.type(screen.getByLabelText(/senha/i), '123456');
      await user.click(screen.getByRole('button', { name: /entrar/i }));

      expect(toast.error).toHaveBeenCalled();
    });

    it('should render link to create a new account', async () => {
      makeSut();

      const registerLink = screen.getByRole('link', { name: /clique aqui/i });

      expect(registerLink).toBeInTheDocument();
      expect(registerLink).toHaveAttribute('href', '/cadastrar');
    });

    it('should render link to forgot password', async () => {
      makeSut();

      const forgotPasswordLink = screen.getByRole('link', {
        name: /esqueci a senha/i,
      });

      expect(forgotPasswordLink).toHaveAttribute('href', '/esqueci-senha');
    });
  });
});
