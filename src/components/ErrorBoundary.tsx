import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || '예기치 않은 오류가 발생했습니다.',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[280px] flex flex-col items-center justify-center px-6 py-12 text-center bg-stone-50 border border-stone-200 rounded-2xl mx-auto max-w-lg my-8">
          <h2 className="font-editorial text-lg font-medium text-zinc-900 mb-2">
            화면을 불러오는 중 문제가 발생했습니다
          </h2>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            네트워크 연결 상태를 확인한 뒤 다시 시도해 주세요.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="min-h-[44px] px-6 py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            다시 시도하기
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
