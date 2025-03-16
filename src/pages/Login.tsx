
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import LoginForm, { LoginFormValues } from "@/components/auth/LoginForm";
import ErrorDialog from "@/components/auth/ErrorDialog";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the intended destination from location state, or default to "/" (dashboard)
  const from = location.state?.from?.pathname || "/";

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    console.log("Login attempt with:", values);

    // Prepare payload
    const payload = {
      email: values.email,
      password: values.password,
      domain: values.domain,
      ttl_in_second: 259200,
    };

    try {
      // Always call the API, don't add special case handling for test credentials
      const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Login API response:", result);

      if (result.error) {
        // Show error dialog
        setErrorMessage(result.data);
        setIsDialogOpen(true);
        console.error("Login failed:", result.data);
      } else {
        // Success, store token and redirect
        localStorage.setItem("authData", JSON.stringify(result.data));
        toast.success("Login successful");
        setIsAuthenticated(true);
        console.log("Login successful, redirecting to dashboard...");
        navigate("/"); // Explicitly navigate to dashboard
      }
    } catch (error) {
      console.error("Login network error:", error);
      setErrorMessage("Network error. Please try again later.");
      setIsDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>

          <LoginForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>
      </div>

      <ErrorDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
