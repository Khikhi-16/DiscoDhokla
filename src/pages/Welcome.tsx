import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

interface Balloon {
  id: number; x: number; duration: number; delay: number;
  size: number; color: string; sway: number;
}

const BALLOON_COLORS = [
  '#c41e3a','#e8a830','#ffd700','#c084fc','#f472b6',
  '#38bdf8','#4ade80','#fb923c','#fff5b0','#e879f9',
];

const Welcome: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const { login } = useUser();
  const navigate = useNavigate();
  const counterRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      setBalloons(prev => {
        if (prev.length > 18) return prev;
        const b: Balloon = {
          id: counterRef.current++,
          x: 5 + Math.random() * 90,
          duration: 7 + Math.random() * 8,
          delay: 0,
          size: 36 + Math.random() * 28,
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          sway: 20 + Math.random() * 30,
        };
        return [...prev, b];
      });
    };
    spawn();
    const iv = setInterval(spawn, 900);
    return () => clearInterval(iv);
  }, []);

  const removeBalloon = (id: number) =>
    setBalloons(prev => prev.filter(b => b.id !== id));

  const handleJoin = () => {
    if (!name.trim()) { setError('Apna naam likho! ✨'); return; }
    setError('');
    login(name.trim(), 'default');
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: '#0d1a2e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', fontFamily: "'Nunito', sans-serif",
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid slice" viewBox="0 0 680 580" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="st" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
            <rect width="60" height="30" fill="#8b5e3c"/>
            <rect x="0" y="0" width="58" height="14" fill="#9b6b45" rx="1"/>
            <rect x="30" y="15" width="28" height="14" fill="#9b6b45" rx="1"/>
            <rect x="0" y="15" width="28" height="14" fill="#9b6b45" rx="1"/>
          </pattern>
          <pattern id="ft" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#c4892a"/>
            <rect x="1" y="1" width="18" height="18" fill="#d4992e" rx="1"/>
            <rect x="21" y="1" width="18" height="18" fill="#b8791e" rx="1"/>
            <rect x="1" y="21" width="18" height="18" fill="#b8791e" rx="1"/>
            <rect x="21" y="21" width="18" height="18" fill="#d4992e" rx="1"/>
          </pattern>
          <style>{`
            @keyframes tS{0%,100%{opacity:1}50%{opacity:0.15}}
            @keyframes lG{0%,100%{opacity:0.65}50%{opacity:1}}
            @keyframes fW{0%,100%{transform:skewX(0deg)}50%{transform:skewX(-12deg)}}
            .ts{animation:tS 2s ease-in-out infinite}
            .lg2{animation:lG 1.5s ease-in-out infinite}
            .fw{animation:fW 1.8s ease-in-out infinite;transform-origin:left center}
          `}</style>
        </defs>
        <rect width="680" height="580" fill="#0d1a2e"/>
        <rect width="680" height="400" fill="#1a0e05"/>
        <circle className="ts" cx="50" cy="35" r="1.5" fill="#ffe"/>
        <circle className="ts" cx="130" cy="20" r="1" fill="#ffe" style={{animationDelay:'.3s'}}/>
        <circle className="ts" cx="260" cy="18" r="2" fill="#ffd700" style={{animationDelay:'.6s'}}/>
        <circle className="ts" cx="420" cy="28" r="1.5" fill="#ffe" style={{animationDelay:'.9s'}}/>
        <circle className="ts" cx="540" cy="15" r="1" fill="#ffd700" style={{animationDelay:'.2s'}}/>
        <circle className="ts" cx="620" cy="40" r="1.5" fill="#ffe" style={{animationDelay:'1.1s'}}/>
        <rect x="0" y="72" width="680" height="448" fill="url(#st)"/>
        <rect x="0" y="72" width="680" height="7" fill="#e8a830"/>
        <rect x="0" y="48" width="680" height="26" fill="#9b6b45"/>
        <rect x="0" y="48" width="680" height="4" fill="#e8a830"/>
        <g fill="#8b5e3c" stroke="#e8a830" strokeWidth="0.5">
          {[10,50,90,130,170,210,250,290,330,370,410,450,490,530,570,610,650].map(x => (
            <rect key={x} x={x} y="26" width="26" height="24" rx="2"/>
          ))}
        </g>
        <ellipse cx="340" cy="34" rx="26" ry="11" fill="#e8a830"/>
        <ellipse cx="340" cy="27" rx="20" ry="17" fill="#c4892a" stroke="#e8a830" strokeWidth="1.5"/>
        <ellipse cx="340" cy="20" rx="13" ry="9" fill="#e8a830"/>
        <line x1="340" y1="0" x2="340" y2="18" stroke="#e8a830" strokeWidth="2"/>
        <ellipse cx="340" cy="4" rx="5" ry="7" fill="#ffd700"/>
        <line x1="90" y1="28" x2="90" y2="6" stroke="#e8a830" strokeWidth="1.5"/>
        <rect className="fw" x="90" y="6" width="28" height="16" fill="#c41e3a" rx="1"/>
        <line x1="590" y1="28" x2="590" y2="6" stroke="#e8a830" strokeWidth="1.5"/>
        <rect className="fw" x="590" y="6" width="28" height="16" fill="#1a3e8c" rx="1" style={{animationDelay:'.5s'}}/>
        <rect x="10" y="82" width="145" height="380" fill="#a0683a" rx="2"/>
        <rect x="14" y="86" width="137" height="372" fill="none" stroke="#e8a830" strokeWidth="1.5"/>
        <rect x="24" y="105" width="117" height="70" fill="none" stroke="#e8a830" strokeWidth="1" rx="2" opacity="0.6"/>
        <rect x="24" y="190" width="117" height="70" fill="none" stroke="#e8a830" strokeWidth="1" rx="2" opacity="0.6"/>
        <rect x="24" y="275" width="117" height="70" fill="none" stroke="#e8a830" strokeWidth="1" rx="2" opacity="0.6"/>
        <rect x="525" y="82" width="145" height="380" fill="#a0683a" rx="2"/>
        <rect x="529" y="86" width="137" height="372" fill="none" stroke="#e8a830" strokeWidth="1.5"/>
        <rect x="539" y="105" width="117" height="70" fill="none" stroke="#e8a830" strokeWidth="1" rx="2" opacity="0.6"/>
        <rect x="539" y="190" width="117" height="70" fill="none" stroke="#e8a830" strokeWidth="1" rx="2" opacity="0.6"/>
        <rect x="539" y="275" width="117" height="70" fill="none" stroke="#e8a830" strokeWidth="1" rx="2" opacity="0.6"/>
        <path d="M195,510 L195,200 Q195,105 340,105 Q485,105 485,200 L485,510" fill="rgba(0,0,0,0.35)" stroke="#e8a830" strokeWidth="2.5"/>
        <path d="M200,510 L200,202 Q200,112 340,112 Q480,112 480,202 L480,510" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="5,3"/>
        <circle cx="340" cy="112" r="7" fill="#c41e3a" stroke="#ffd700" strokeWidth="1.5"/>
        <circle cx="340" cy="112" r="3" fill="#ffd700"/>
        <circle cx="230" cy="148" r="6" fill="#c41e3a" stroke="#ffd700" strokeWidth="1"/>
        <circle cx="230" cy="148" r="2.5" fill="#ffd700"/>
        <circle cx="450" cy="148" r="6" fill="#c41e3a" stroke="#ffd700" strokeWidth="1"/>
        <circle cx="450" cy="148" r="2.5" fill="#ffd700"/>
        <g className="lg2">
          <line x1="250" y1="100" x2="250" y2="130" stroke="#e8a830" strokeWidth="1.5"/>
          <ellipse cx="250" cy="138" rx="9" ry="13" fill="#ffd700" stroke="#c4892a" strokeWidth="1"/>
          <ellipse cx="250" cy="135" rx="5" ry="4" fill="#fff5b0" opacity="0.9"/>
        </g>
        <g className="lg2" style={{animationDelay:'.5s'}}>
          <line x1="430" y1="100" x2="430" y2="130" stroke="#e8a830" strokeWidth="1.5"/>
          <ellipse cx="430" cy="138" rx="9" ry="13" fill="#ffd700" stroke="#c4892a" strokeWidth="1"/>
          <ellipse cx="430" cy="135" rx="5" ry="4" fill="#fff5b0" opacity="0.9"/>
        </g>
        <rect x="0" y="520" width="680" height="60" fill="url(#ft)"/>
        <rect x="0" y="516" width="680" height="6" fill="#e8a830"/>
        <rect x="160" y="490" width="24" height="28" fill="#c4892a" rx="2"/>
        <rect x="158" y="486" width="28" height="7" fill="#e8a830" rx="1"/>
        <ellipse cx="172" cy="478" rx="16" ry="19" fill="#2d5a1b"/>
        <ellipse cx="166" cy="470" rx="9" ry="12" fill="#3a7a22"/>
        <ellipse cx="179" cy="468" rx="9" ry="12" fill="#3a7a22"/>
        <circle cx="172" cy="462" r="5" fill="#c41e3a"/>
        <rect x="496" y="490" width="24" height="28" fill="#c4892a" rx="2"/>
        <rect x="494" y="486" width="28" height="7" fill="#e8a830" rx="1"/>
        <ellipse cx="508" cy="478" rx="16" ry="19" fill="#2d5a1b"/>
        <ellipse cx="502" cy="470" rx="9" ry="12" fill="#3a7a22"/>
        <ellipse cx="515" cy="468" rx="9" ry="12" fill="#3a7a22"/>
        <circle cx="508" cy="462" r="5" fill="#c41e3a"/>
      </svg>

      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        {balloons.map(b => (
          <div key={b.id} onAnimationEnd={() => removeBalloon(b.id)}
            style={{ position:'absolute', left:`${b.x}%`, bottom:'-80px', width:`${b.size}px`,
              animation:`balloonRise ${b.duration}s ease-in forwards` }}>
            <svg width={b.size} height={b.size * 1.4} viewBox="0 0 60 84">
              <ellipse cx="30" cy="32" rx="28" ry="30" fill={b.color} opacity="0.88"/>
              <ellipse cx="22" cy="20" rx="8" ry="7" fill="rgba(255,255,255,0.28)"/>
              <path d="M30,62 Q34,72 30,82" stroke={b.color} strokeWidth="1.8" fill="none"/>
              <polygon points="27,62 33,62 30,68" fill={b.color} opacity="0.7"/>
            </svg>
          </div>
        ))}
      </div>

      <div style={{ position:'relative', zIndex:10, background:'rgba(10,5,20,0.72)',
        backdropFilter:'blur(18px)', border:'2px solid rgba(232,168,48,0.55)',
        borderRadius:'24px', padding:'2.4rem 2.2rem', width:'min(420px, 90vw)',
        textAlign:'center', boxShadow:'0 0 60px rgba(232,168,48,0.18)' }}>
        <div style={{ marginBottom:'0.4rem', fontSize:'2.6rem', lineHeight:1 }}>👑</div>
        <h1 style={{ fontFamily:"'Boogaloo', cursive", fontSize:'clamp(2rem,6vw,2.8rem)',
          color:'#ffd700', textShadow:'0 0 20px rgba(255,215,0,0.5)', margin:'0 0 0.3rem', letterSpacing:'2px' }}>
          You're Invited!
        </h1>
        <p style={{ color:'#e8c87a', fontSize:'0.9rem', marginBottom:'2rem', letterSpacing:'1px' }}>
          ✦ &nbsp;A Royal Birthday Awaits&nbsp; ✦
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1.4rem' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(232,168,48,0.3)' }}/>
          <span style={{ color:'#e8a830', fontSize:'0.75rem', letterSpacing:'2px' }}>YOUR NAME</span>
          <div style={{ flex:1, height:'1px', background:'rgba(232,168,48,0.3)' }}/>
        </div>
        <input type="text" placeholder="Enter your name 🌟" maxLength={20}
          value={name} onChange={e => { setName(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          style={{ width:'100%', padding:'0.85rem 1.1rem', borderRadius:'12px',
            background:'rgba(255,255,255,0.07)', border:`2px solid ${error ? '#f87171' : 'rgba(232,168,48,0.35)'}`,
            color:'#fff', fontSize:'1.05rem', fontFamily:"'Nunito', sans-serif",
            marginBottom:'0.6rem', outline:'none' }}
          onFocus={e => e.target.style.borderColor='#ffd700'}
          onBlur={e => e.target.style.borderColor=error?'#f87171':'rgba(232,168,48,0.35)'}
        />
        {error && <p style={{ color:'#f87171', fontSize:'.85rem', marginBottom:'.8rem' }}>{error}</p>}
        <button onClick={handleJoin}
          style={{ width:'100%', padding:'0.95rem', borderRadius:'14px', border:'none', cursor:'pointer',
            background:'linear-gradient(135deg, #e8a830, #ffd700, #c4892a)', color:'#1a0a00',
            fontFamily:"'Boogaloo', cursive", fontSize:'1.3rem', letterSpacing:'1px',
            boxShadow:'0 4px 24px rgba(232,168,48,0.45)' }}>
          Enter the Party 🎉
        </button>
        <p style={{ color:'rgba(232,168,48,0.4)', fontSize:'.75rem', marginTop:'1.2rem', letterSpacing:'3px' }}>
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;600;700&display=swap');
        @keyframes balloonRise {
          0%   { transform: translateY(0); opacity: 0; }
          5%   { opacity: 1; }
          100% { transform: translateY(-110vh); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
