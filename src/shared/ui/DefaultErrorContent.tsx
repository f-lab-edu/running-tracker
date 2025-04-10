import { FC } from "react";

interface DefaultErrorContentProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const DefaultErrorContent: FC<DefaultErrorContentProps> = ({ error, resetErrorBoundary }) => {
  return <div>
    <h1>Oops! Something went wrong</h1>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>;
};

export default DefaultErrorContent;