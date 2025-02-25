
import React, { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Performance indicator error:", error, errorInfo);
    toast.error("Something went wrong with the performance display");
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          <h2 className="font-semibold">Oops, there was an error!</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
