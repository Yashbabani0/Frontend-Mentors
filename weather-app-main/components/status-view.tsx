import Image from "next/image";

export function StatusView({ type, onRetry }: { type: "loading" | "error"; onRetry?: () => void }) {
  if (type === "loading") return <div className="status-view loading"><Image src="/icon-loading.svg" alt="" width={28} height={28} /><p>Loading weather data...</p></div>;
  return (
    <section className="status-view error-state">
      <Image src="/icon-error.svg" alt="" width={42} height={42} />
      <h1>Something went wrong</h1>
      <p>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
      <button type="button" onClick={onRetry}><Image src="/icon-retry.svg" alt="" width={17} height={17} /> Retry</button>
    </section>
  );
}
