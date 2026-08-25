import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

/**
 * Custom cleaning-tool icon set for Sparkly Space.
 * Stroke-based, 24x24, inherits size via className (h-* w-*) and colour via
 * text-* (stroke="currentColor") — same ergonomics as lucide-react icons.
 */
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SprayBottle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8.5 9h4.2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
    <path d="M8.5 9V6h4.2" />
    <path d="M12.7 6V3.4h3.3" />
    <path d="M6.8 13.5h6.6" />
    <circle cx="18" cy="4" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="20.2" cy="6" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="18" cy="8" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="21.4" cy="9" r="0.5" fill="currentColor" stroke="none" />
  </Icon>
);

export const ScrubBrush = (props: IconProps) => (
  <Icon {...props}>
    <path d="M15.5 3.5 20.5 8.5" />
    <path d="M4.7 13.4 10.6 19.3l4-4a3.2 3.2 0 0 0 0-4.5l-1.4-1.4a3.2 3.2 0 0 0-4.5 0Z" />
    <path d="M4.7 19.4 3 21.2" />
    <path d="M7.2 20.6 6 21.8" />
    <path d="M9.6 21.4 8.7 22.3" />
  </Icon>
);

export const Mop = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2.5v9" />
    <path d="M7.5 11.5h9l-1.2 4.3a2 2 0 0 1-1.9 1.4h-2.8a2 2 0 0 1-1.9-1.4Z" />
    <path d="M9.3 17.4 8.4 21.5" />
    <path d="M12 17.6v3.9" />
    <path d="M14.7 17.4l.9 4.1" />
  </Icon>
);

export const Bucket = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 8.5h14l-1.4 10.8a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7Z" />
    <path d="M3.8 8.5c0-1.6 3.7-3 8.2-3s8.2 1.4 8.2 3" />
    <path d="M8.5 6c.6-1.6 1.9-2.6 3.5-2.6S15 4.4 15.5 6" />
  </Icon>
);

export const Squeegee = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3.2v9.3" />
    <path d="M9 3.2h6" />
    <rect x="4.5" y="12.5" width="15" height="3.4" rx="1" />
    <path d="M6.2 16 5 20.8" />
    <path d="M17.8 16 19 20.8" />
    <path d="M12 16v4.8" />
  </Icon>
);

export const Duster = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 13.5V21" />
    <path d="M12 13.8c-3.1 0-5.2-2.2-5.2-5.4S8.9 3 12 3s5.2 2.2 5.2 5.4-2.1 5.4-5.2 5.4Z" />
    <path d="M12 3.4v10" />
    <path d="M8.4 5.2c1.4 1.7 1.4 5.6 0 7.1" />
    <path d="M15.6 5.2c-1.4 1.7-1.4 5.6 0 7.1" />
  </Icon>
);
