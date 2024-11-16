import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-7xl font-bold text-red-500">404 Not Found</h1>
      <p className="text-2xl mt-4">Redirecting in {countdown}</p>
    </div>
  );
}

export default NotFound;