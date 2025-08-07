import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: RootLayoutProps) => {
  return <div className="flex justify-center pt-40">{children}</div>;
};

export default AuthLayout;
