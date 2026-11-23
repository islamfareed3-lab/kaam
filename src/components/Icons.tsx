type IconProps = { className?: string };

export function IconDriver({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 16.5h16l-1.2-5.4A3 3 0 0 0 15.9 9H8.1a3 3 0 0 0-2.9 2.1L4 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="7.5" cy="16.5" r="1.7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="16.5" r="1.7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9.2 10.2 6.8h3.6L15 9.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCook({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 10h12v2.2a6 6 0 0 1-12 0V10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5 13.8 9.2 19.5 11 13.8 12.8 12 18.5 10.2 12.8 4.5 11l5.7-1.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCare({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M5 19c3-3 6-7 8-12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
