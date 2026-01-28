// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

// import { useAuth } from "@/hooks/use-auth";
// import Loading from "../ui/loading/loading";

// interface IAuthProviderProps {
//   children: React.ReactNode;
// }

// const publicRoutes = ["/", "/recuperar-senha"];
// export const AuthValidator = ({ children }: IAuthProviderProps) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const pathname = usePathname() ?? "/";
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoading) return;

//     if (!isAuthenticated && !publicRoutes.includes(pathname))
//       return router.replace("/");

//     if (isAuthenticated && pathname === "/") {
//       return router.replace("/dashboard");
//     }
//   }, [isAuthenticated, isLoading, pathname, router]);

//   if (isLoading) return <Loading size={32} />;

//   return <>{children}</>;
// };
