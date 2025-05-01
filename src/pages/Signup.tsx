
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const Signup: React.FC = () => {
  return (
    <AuthLayout
      title="Create an account"
      description="Sign up to get started with TaskTracker"
      showSignIn={true}
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
