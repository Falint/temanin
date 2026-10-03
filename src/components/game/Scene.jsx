// Lightweight scenery and characters drawn entirely with SVG.
export function Character({ x = 360, color = '#697d96', longHair = false, mood = 'neutral' }) {
  return <g transform={`translate(${x} 145)`}>
    <ellipse cx="0" cy="179" rx="51" ry="9" fill="#273e4020" />
    {longHair && <path d="M-34 15Q-42-24 0-24Q43-24 36 23L44 94H-42Z" fill="#343244" />}
    <path d="M-35 87Q0 67 35 87L47 145H-46Z" fill="#faf8ef" />
    <path d="M-30 137H31L36 175H-35Z" fill={color} />
    <path d="M-5 86L0 95L6 86L8 129L0 137L-8 129Z" fill={color} />
    <rect x="-9" y="64" width="18" height="22" rx="5" fill="#dca783" />
    <ellipse cy="36" rx="33" ry="38" fill="#edc09d" />
    <path d="M-32 34Q-42-20 1-21Q41-19 34 32L20 9Q0 21-19 5Z" fill="#343244" />
    <path d="M-17 36h5m19 0h5" stroke="#343244" strokeWidth="3" strokeLinecap="round" />
    <path d={mood === 'happy' ? 'M-9 51Q0 63 10 51' : 'M-6 53Q0 56 7 53'} fill="none" stroke="#a36759" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M-34 94L-45 130M35 94L43 129" stroke="#edc09d" strokeWidth="14" strokeLinecap="round" />
    <path d="M-21 175v17m42-17v17" stroke="#343244" strokeWidth="12" strokeLinecap="round" />
  </g>;
}

export default function Scene({ type = 'courtyard', avatar = 'girl', mood = 'neutral', compact = false }) {
  const indoor = type === 'classroom' || type === 'bedroom';
  return <svg viewBox="0 0 720 360" role="img" aria-label={{ classroom: 'Ruang kelas dengan papan tulis dan meja', bedroom: 'Kamar belajar pada sore hari', courtyard: 'Halaman sekolah di bawah pohon', canteen: 'Kantin sekolah saat istirahat' }[type]} preserveAspectRatio="xMidYMid slice">
    <rect width="720" height="360" fill={indoor ? '#e9e3d3' : '#dceae2'} />
    <circle cx="595" cy="67" r="39" fill="#f3d695" />
    {indoor ? <>
      <rect x="43" y="42" width="182" height="145" rx="6" fill="#f9f6ee" />
      <rect x="54" y="54" width="160" height="120" fill="#c3dcd4" />
      <path d="M135 54v120M54 115h160" stroke="#f9f6ee" strokeWidth="8" />
      <path d="M0 260H720V360H0Z" fill="#c5b69e" />
      {type === 'classroom' ? <>
        <rect x="302" y="43" width="344" height="145" rx="7" fill="#a68463" />
        <rect x="312" y="53" width="324" height="125" rx="2" fill="#50776d" />
        <path d="M345 85h140m-140 20h221m-221 20h85m20 0h95" stroke="#e9ecdc" strokeWidth="3" opacity=".55" />
        <path d="M48 307h147m-125 0v53m101-53v53M540 307h145m-125 0v53m101-53v53" stroke="#947352" strokeWidth="12" />
      </> : <>
        <rect x="459" y="215" width="219" height="66" rx="12" fill="#a5b8c6" />
        <rect x="471" y="207" width="65" height="25" rx="8" fill="#f8f5ed" />
        <path d="M49 252h200m-183 0v74m166-74v74" stroke="#967654" strokeWidth="13" />
        <path d="M91 243h60m-52-9h58" stroke="#62788b" strokeWidth="9" />
        <path d="M190 246v-48m-22 0h44l-11-34h-22Z" fill="#e0ba72" stroke="#967654" strokeWidth="5" />
      </>}
    </> : <>
      <rect y="230" width="720" height="130" fill="#b4c7a9" />
      <path d="M275 230h152l110 130H167Z" fill="#ded3ba" />
      <rect x="79" y="93" width="389" height="139" rx="5" fill="#f0e7d2" />
      <path d="M62 94L274 37L482 94Z" fill="#9e8270" />
      {[109, 185, 337, 405].map(x => <rect key={x} x={x} y="118" width="36" height="48" fill="#92b4b1" />)}
      <rect x="249" y="155" width="57" height="77" fill="#8d9c93" />
      <path d="M599 102v166" stroke="#9c8165" strokeWidth="19" />
      <circle cx="595" cy="102" r="69" fill="#88aa8f" /><circle cx="649" cy="118" r="49" fill="#9dbb9b" />
      {type === 'canteen' && <>
        <path d="M19 177h188l-18-34H39Z" fill="#bc8b77" />
        <path d="M42 181v99m139-99v99M18 272h188" stroke="#9a7b5c" strokeWidth="10" />
        <rect x="51" y="242" width="121" height="24" rx="3" fill="#e4be77" />
      </>}
    </>}
    <Character x={compact ? 365 : 300} color="#697d96" longHair={avatar === 'girl'} mood={mood} />
    {!compact && <Character x={419} color="#a88582" longHair={avatar !== 'girl'} mood={mood} />}
    <path d="M0 345H720" stroke="#ffffff30" strokeWidth="30" />
  </svg>;
}
