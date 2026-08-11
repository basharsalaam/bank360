declare module 'react-hot-toast' {
    interface Toast {
      error: (message: string, options?: any) => void;
      success: (message: string, options?: any) => void;
      // Add other methods as needed
    }
    const toast: Toast;
    export default toast;
  }
  