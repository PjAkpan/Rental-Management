import React, { useState, useEffect } from "react";

const withLoader = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulate a loading delay
      return () => clearTimeout(timeout); // Cleanup
    }, []);

    if (isLoading) {
      // Render Skeleton Loader during loading
      return (
        <div className="animate-pulse space-y-4 p-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-5 bg-gray-300 rounded w-full"></div>
          ))}
        </div>
      );
    }

    // Render the actual wrapped component after loading is complete
    return <WrappedComponent {...props} />;
  };
};

export default withLoader;
