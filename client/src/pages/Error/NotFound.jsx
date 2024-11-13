import React, { useEffect } from "react";
import Error from "../../components/ui/Error";
import { useNavigate } from "react-router-dom";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = React.useState(5);
  const {
    data: profiledata,
    isError,
    isLoading,
  } = useGetOperatorProfileQuery();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!profiledata && !isLoading) {
        navigate("/login/club");
      } else if (isError) {
        navigate("/login/club");
      } else {
        navigate("/");
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [navigate, profiledata, isLoading, isError]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container mx-auto h-screen w-screen flex items-center justify-center py-10 px-20">
          <div className="max-w-screen-lg">
            <Error
              number={profiledata ? null : "404"}
              title={
                profiledata
                  ? `Welcome, ${profiledata.data.username}!`
                  : "OOPS! PAGE NOT FOUND"
              }
              description={
                profiledata
                  ? `You are logged in. Redirecting you to the home page in ${count} seconds.`
                  : `Sorry, the page you’re looking for doesn’t exist. If you think something is broken, report a problem. You will be redirected to the login page in ${count} seconds.`
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
