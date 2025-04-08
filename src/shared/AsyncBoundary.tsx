import { cloneElement, ReactElement, ReactNode, Suspense, useCallback } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { DefaultErrorContent } from './DefaultErrorContent'
import { Spinner } from '@heroui/react'
import StateRender from './StateRender'

interface AsyncBoundaryProps {
  errorFallback?: ((props: FallbackProps) => ReactNode) | ReactElement<FallbackProps>
  fallback?: ReactElement
  children: ReactNode
  spinner?: boolean
  spinnerSize?: 'sm' | 'md' | 'lg'
  spinnerColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export function AsyncBoundary(props: AsyncBoundaryProps) {
  const {
    errorFallback,
    spinner = true,
    spinnerSize = 'md',
    spinnerColor = 'primary',
    fallback,
    children
  } = props

  const errorFallbackRender = useCallback((props: FallbackProps) => {
    if (!errorFallback) {
      return <DefaultErrorContent {...props} />
    }
    if (typeof errorFallback === 'function') {
      return errorFallback(props)
    }
    return cloneElement(errorFallback, props)
  }, [errorFallback])

  return (
    <ErrorBoundary fallbackRender={errorFallbackRender}>
      <Suspense fallback={
        <StateRender.Boolean
          state={!!spinner}
          render={{
            true: () => (
              <div className="flex justify-center items-center w-full h-40">
                <Spinner size={spinnerSize} color={spinnerColor} />
              </div>
            ),
            false: () => fallback || null
          }}
        />
      }>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}
