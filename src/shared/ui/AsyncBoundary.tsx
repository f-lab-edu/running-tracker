import { FC, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import DefaultErrorContent from "./DefaultErrorContent";
interface AsyncBoundaryProps {
  pendingFallback: React.ReactNode;
  rejectedFallback?: (props: FallbackProps) => React.ReactNode;
  children: React.ReactNode;
}

const AsyncBoundary: FC<AsyncBoundaryProps> = ({ pendingFallback, rejectedFallback, children }) => {
  return <ErrorBoundary fallbackRender={
    rejectedFallback ?
      rejectedFallback :
      ({ error, resetErrorBoundary }) => <DefaultErrorContent error={error} resetErrorBoundary={resetErrorBoundary} />
  }>
    <Suspense fallback={pendingFallback}>
      {children}
    </Suspense>
  </ErrorBoundary>;
};

export default AsyncBoundary;
