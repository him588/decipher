export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <div className="absolute inset-0 shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}
