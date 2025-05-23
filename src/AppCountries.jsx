import { AppRouter } from "./Router/AppRouter.jsx";
import AuthProvider from "./auth/pages/context/AuthProvider.jsx";


export const AppCountries = () => {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
};
