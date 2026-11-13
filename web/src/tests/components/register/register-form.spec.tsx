import { RegisterForm } from '@/components/layouts/(public)/register-form/register-form';
import { ProviderGlobal } from '@/components/providers/provider-global';
import { useAuth } from '@/hooks/use-auth';
import { render, screen, waitFor } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const registerServiceMock = jest.fn();
jest.mock('@/hooks/use-auth');

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const makeSut = () => {
  (useAuth as jest.Mock).mockReturnValue({
    register: registerServiceMock,
  });

  render(
    <ProviderGlobal>
      <RegisterForm />
    </ProviderGlobal>,
  );
};

describe('Register Form', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Base', () => {
    it('should render the register form', () => {
      makeSut();
    });

    it('should render the form fields', () => {
      makeSut();

      const nameInput = screen.getByPlaceholderText(/digite o nome/i);
      const emailInput = screen.getByPlaceholderText(/digite o email/i);
      const passwordInput = screen.getByPlaceholderText(/digite a senha/i);
      const confirmPasswordInput = screen.getByPlaceholderText(
        /digite a confirmação de senha/i,
      );
      const button = screen.getByRole('button', { name: /cadastrar/i });

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should allow typing name', async () => {
      makeSut();

      const nameInput = screen.getByPlaceholderText(/digite o nome/i);
      await user.type(nameInput, 'test');

      expect(nameInput).toHaveValue('test');
    });

    it('should allow typing email', async () => {
      makeSut();

      const emailInput = screen.getByPlaceholderText(/digite o email/i);
      await user.type(emailInput, 'test@email.com');

      expect(emailInput).toHaveValue('test@email.com');
    });

    it('should allow typing password', async () => {
      makeSut();

      const passwordInput = screen.getByPlaceholderText(/digite a senha/i);
      await user.type(passwordInput, '123456');

      expect(passwordInput).toHaveValue('123456');
    });

    it('should allow typing confirm password', async () => {
      makeSut();

      const confirmPasswordInput = screen.getByPlaceholderText(
        /digite a confirmação de senha/i,
      );
      await user.type(confirmPasswordInput, '123456');

      expect(confirmPasswordInput).toHaveValue('123456');
    });

    it('should show validation errors', async () => {
      makeSut();

      const submitButton = screen.getByRole('button', { name: /cadastrar/i });

      await user.click(submitButton);

      const messageErrorNameInput =
        await screen.findByText(/nome é obrigatório/i);
      const messageErrorEmailInput = await screen.findByText(
        /digite um e-mail válido/i,
      );
      const messageErrorPasswordInput =
        await screen.findAllByText(/senha é obrigatória/i);

      expect(messageErrorNameInput).toBeInTheDocument();
      expect(messageErrorEmailInput).toBeInTheDocument();
      expect(messageErrorPasswordInput).toHaveLength(2);
    });

    it('should disable button while submitting', async () => {
      registerServiceMock.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      makeSut();

      const inputName = screen.getByPlaceholderText(/digite o nome/i);
      const inputEmail = screen.getByPlaceholderText(/digite o email/i);
      const inputPassword = screen.getByPlaceholderText(/digite a senha/i);
      const inputConfirmPassword = screen.getByPlaceholderText(
        /digite a confirmação de senha/i,
      );

      await user.type(inputName, 'test');
      await user.type(inputEmail, 'test@email.com');
      await user.type(inputPassword, '123456');
      await user.type(inputConfirmPassword, '123456');

      const button = screen.getByRole('button', { name: /cadastrar/i });

      await user.click(button);

      expect(button).toBeDisabled();
    });

    it('should not call registerService when form is invalid', async () => {
      makeSut();

      const button = screen.getByRole('button', { name: /cadastrar/i });

      await user.click(button);

      await waitFor(() => {
        expect(registerServiceMock).not.toHaveBeenCalled();
      });
    });

    it('should call registerService with correct values', async () => {
      makeSut();

      const inputName = screen.getByPlaceholderText(/digite o nome/i);
      const inputEmail = screen.getByPlaceholderText(/digite o email/i);
      const inputPassword = screen.getByPlaceholderText(/digite a senha/i);
      const inputConfirmPassword = screen.getByPlaceholderText(
        /digite a confirmação de senha/i,
      );

      await user.type(inputName, 'test');
      await user.type(inputEmail, 'test@email.com');
      await user.type(inputPassword, '123456');
      await user.type(inputConfirmPassword, '123456');

      const button = screen.getByRole('button', { name: /cadastrar/i });

      await user.click(button);

      await waitFor(() => {
        expect(registerServiceMock).toHaveBeenCalledWith(
          'test',
          'test@email.com',
          '123456',
        );
      });
    });

    it('should redirect to login page', async () => {
      makeSut();

      const inputName = screen.getByPlaceholderText(/digite o nome/i);
      const inputEmail = screen.getByPlaceholderText(/digite o email/i);
      const inputPassword = screen.getByPlaceholderText(/digite a senha/i);
      const inputConfirmPassword = screen.getByPlaceholderText(
        /digite a confirmação de senha/i,
      );

      await user.type(inputName, 'test');
      await user.type(inputEmail, 'test@email.com');
      await user.type(inputPassword, '123456');
      await user.type(inputConfirmPassword, '123456');

      await user.click(screen.getByRole('button', { name: /cadastrar/i }));
      const confirmButton = await screen.findByRole('button', {
        name: /continuar/i,
      });

      await user.click(confirmButton);

      expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('should show error toast when login fails', async () => {
      registerServiceMock.mockRejectedValueOnce(new Error('Invalid'));

      makeSut();

      const inputName = screen.getByPlaceholderText(/digite o nome/i);
      const inputEmail = screen.getByPlaceholderText(/digite o email/i);
      const inputPassword = screen.getByPlaceholderText(/digite a senha/i);
      const inputConfirmPassword = screen.getByPlaceholderText(
        /digite a confirmação de senha/i,
      );

      await user.type(inputName, 'test');
      await user.type(inputEmail, 'test@email.com');
      await user.type(inputPassword, '123456');
      await user.type(inputConfirmPassword, '123456');

      const button = screen.getByRole('button', { name: /cadastrar/i });

      await user.click(button);

      expect(toast.error).toHaveBeenCalled();
    });
  });
});
