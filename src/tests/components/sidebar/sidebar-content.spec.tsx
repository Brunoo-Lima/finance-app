import { Sidebar } from '@/components/sidebar/sidebar';
import { AuthProvider } from '@/context/auth-context';
import { render, screen } from '@/lib/test-utils';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/dashboard',
}));

const makeSut = () => {
  return render(
    <AuthProvider>
      <Sidebar />
    </AuthProvider>,
  );
};

describe('SidebarContent', () => {
  it('should have the app name', () => {
    makeSut();

    expect(screen.getByText('MasterCash')).toBeInTheDocument();
  });
});
