const variants = {
  outline: [
    "bg-transparent text-text-primary",
    "border border-border hover:border-border-strong",
    "hover:bg-white/[0.03]",
    "px-5 sm:px-[22px] py-2.5 sm:py-2.5",
  ].join(" "),

  primary: [
    "bg-yfx-brand text-white",
    "hover:bg-yfx-brand-hover hover:shadow-glow",
    "border-none",
    "px-5 sm:px-6 py-3 sm:py-2.5",
  ].join(" "),

  ghost: [
    "bg-transparent text-yfx-brand",
    "border-none p-0",
    "hover:text-yfx-brand-light",
  ].join(" "),
};

export default function Button({
  children,
  variant = "outline",
  className = "",
  href,
  ...props
}) {
  const classes = [
    "inline-flex items-center gap-2",
    "font-sans text-sm font-medium tracking-[0.01em]",
    "rounded-button cursor-pointer",
    "transition-all duration-200 ease-out",
    /* 44px min touch target for outline & primary */
    variant !== "ghost" ? "min-h-[44px]" : "",
    variants[variant],
    className,
  ].filter(Boolean).join(" ");

  const inner = (
    <>
      {children}
      <span className="text-[1em]">→</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  );
}
