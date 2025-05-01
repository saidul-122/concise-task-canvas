
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
  showSignUp?: boolean;
  showSignIn?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  description, 
  footer,
  showSignUp = false,
  showSignIn = false
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50 to-indigo-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {(footer || showSignUp || showSignIn) && (
          <CardFooter className="flex flex-col space-y-4">
            {footer}
            
            {showSignUp && (
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary" 
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>
              </div>
            )}
            
            {showSignIn && (
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary" 
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthLayout;
