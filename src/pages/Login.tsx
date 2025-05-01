
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
      showSignUp={true}
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
