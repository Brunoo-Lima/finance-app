import { Sidebar } from '@/components/sidebar/sidebar';
import { AuthProvider } from '@/context/auth-context';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/dashboard',
}));

const logoutMock = jest.fn();
jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    logout: logoutMock,
  }),
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

const NavsLink = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Transações',
    href: '/transacoes',
  },
  {
    title: 'Metas',
    href: '/metas',
  },
  {
    title: 'Conta',
    href: '/conta',
  },
];

const makeSut = () => {
  return render(
    <AuthProvider>
      <Sidebar />
    </AuthProvider>,
  );
};

describe('SidebarContent', () => {
  const user = userEvent.setup();

  describe('Base', () => {
    it('should render the sidebar', () => {
      makeSut();

      expect(screen.getByRole('complementary')).toBeVisible();
    });

    it('should render the logo', () => {
      makeSut();

      const logoAltName = screen.getByAltText(/logo/i);

      expect(logoAltName).toBeVisible();
    });
    it('should render the app name', () => {
      makeSut();

      const NameApp = screen.getByText(/mastercash/i);

      expect(NameApp).toBeInTheDocument();
    });

    it('should render the version number', () => {
      makeSut();

      const versionNumber = screen.getByText('v3.0');

      expect(versionNumber).toBeInTheDocument();
    });

    it('should render the navigation links', () => {
      makeSut();

      NavsLink.forEach((nav) => {
        expect(screen.getByText(nav.title)).toBeInTheDocument();
      });
    });

    it('should render navigation links with correct href', () => {
      makeSut();

      NavsLink.forEach((nav) => {
        const link = screen.getByRole('link', { name: nav.title });
        expect(link).toHaveAttribute('href', nav.href);
      });
    });

    it('should render the active navigation link', async () => {
      makeSut();

      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });

      expect(dashboardLink).toHaveClass('active');
    });

    it('should show tooltip when hovering link', async () => {
      makeSut();

      const link = screen.getByRole('link', { name: /dashboard/i });

      await user.hover(link);

      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });

    it('should hide tooltip when mouse leaves', async () => {
      makeSut();

      const link = screen.getByRole('link', { name: /dashboard/i });

      await user.hover(link);
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();

      await user.unhover(link);
      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });

    it('should render the logout button', () => {
      makeSut();

      expect(screen.getByRole('button', { name: 'Sair' })).toBeVisible();
    });

    it('should call logout', async () => {
      makeSut();

      const newButton = screen.getByRole('button', { name: 'Sair' });

      await user.click(newButton);

      expect(logoutMock).toHaveBeenCalled();
    });
  });
});
