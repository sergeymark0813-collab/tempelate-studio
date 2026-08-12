import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { errorFallbackCopy } from '../lib/i18n/fallback';

/* ===========================================================================
   Catches render-time crashes so one bad branch can't white-screen the app.

   Generation touches a lot of procedural geometry and colour maths; if any of
   it throws, the user should get a readable message and a way out — not an
   empty page with a stack trace in the console.
   =========================================================================== */

interface Props {
  children: ReactNode;
  /** Shown instead of the default title. */
  title?: string;
  /** Called when the user asks to retry, so the parent can reset its state. */
  onReset?: () => void;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Kept in the console for diagnosis; the user sees the friendly panel below.
    console.error('Сбой в интерфейсе:', error, info.componentStack);
  }

  private reset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    // Resolved here, not at module load, so it follows the current language.
    const copy = errorFallbackCopy();

    return (
      <div className="panel px-5 py-8 text-center sm:px-8">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          {this.props.title ?? copy.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-white/45">
          {copy.body}
        </p>
        <p className="mx-auto mt-3 max-w-md font-mono text-[11.5px] break-words text-white/25">
          {error.message}
        </p>
        <button
          type="button"
          onClick={this.reset}
          className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
        >
          <RefreshCw size={15} /> {copy.retry}
        </button>
      </div>
    );
  }
}
