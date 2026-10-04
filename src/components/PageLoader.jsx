import '../styles/pageLoader.css';

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading BC Eats">
      <div className="page-loader__spinner" aria-hidden="true" />
      <p className="page-loader__label">Loading BC Eats…</p>
    </div>
  );
}
