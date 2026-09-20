export default function Logo({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo TEMANIN"
    >
      {/* Background circle / organic shape */}
      <rect width="32" height="32" rx="10" fill="url(#temanin-gradient)" />
      
      {/* Heart + Sprout symbolizing peer support & youth mental health growth */}
      <path
        d="M16 23.5C16 23.5 9 18.8 9 14C9 11.79 10.79 10 13 10C14.34 10 15.42 10.72 16 11.5C16.58 10.72 17.66 10 19 10C21.21 10 23 11.79 23 14C23 18.8 16 23.5 16 23.5Z"
        fill="white"
      />
      <circle cx="16" cy="14.5" r="2" fill="#10B981" />

      <defs>
        <linearGradient id="temanin-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}
