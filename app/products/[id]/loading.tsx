export default function ProductLoading() {
  return (
    <div className="min-h-screen pt-[64px] flex items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-8 w-64 bg-muted rounded" />
        <div className="h-4 w-48 bg-muted rounded" />
      </div>
    </div>
  );
}
