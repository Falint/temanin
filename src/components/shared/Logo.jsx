import Image from 'next/image';

export default function Logo({ size = 40, className = '' }) {
  return (
    <Image
      src="/logo-temanin.png"
      width={size}
      height={size}
      alt="Logo TEMANIN"
      className={className}
    />
  );
}
