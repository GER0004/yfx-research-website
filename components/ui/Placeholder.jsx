export default function Placeholder({
  height = "h-80",
  gradient = false,
  className = "",
}) {
  return (
    <div
      className={`
        w-full ${height} rounded-card overflow-hidden relative
        border border-border-subtle
        ${gradient ? "" : "bg-yfx-card"}
        ${className}
      `}
      style={
        gradient
          ? {
              background:
                "linear-gradient(135deg, #0B0E1A 0%, #111B27 40%, #0d1f3c 70%, #132044 100%)",
            }
          : undefined
      }
    >
      {gradient && (
        <div
          className="absolute bottom-[20%] left-[30%] w-[40%] h-[30%] blur-[30px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
