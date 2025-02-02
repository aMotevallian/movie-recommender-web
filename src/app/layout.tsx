import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "../styles/globals.css";
import Navbar from "../components/navBar";
import { SnackbarProvider } from "../components/snackbarContext";
import { AuthProvider } from "../components/authContext";

// Import the Inter font
const inter = Inter({ subsets: ["latin"] });
import { Nunito } from "@next/font/google";
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AppRouterCacheProvider>
          <AuthProvider>  {/* Wrap the app with AuthProvider */}
            <SnackbarProvider>  {/* You can keep this here */}
              <Navbar />  {/* Navbar will have access to auth context */}
              {children}  {/* Main content */}
            </SnackbarProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
