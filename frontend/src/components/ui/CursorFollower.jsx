import { useEffect, useRef } from 'react'

const CursorFollower = () => {
  const diamondRef = useRef()
  const auraRef = useRef()
  
  const auraPos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      
      // Diamond follows INSTANTLY (1:1 tracking)
      if (diamondRef.current) {
        diamondRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }

      // Hover Detection
      const isMagnetic = e.target.closest('a, button, .magnetic')
      const isThreeCanvas = e.target.closest('#hero-canvas, .three-canvas')
      
      if (diamondRef.current && auraRef.current) {
        if (isMagnetic) {
          diamondRef.current.setAttribute('data-hover', 'magnetic')
          auraRef.current.setAttribute('data-hover', 'magnetic')
        } else if (isThreeCanvas) {
          diamondRef.current.setAttribute('data-hover', 'canvas')
          auraRef.current.setAttribute('data-hover', 'canvas')
        } else {
          diamondRef.current.setAttribute('data-hover', 'default')
          auraRef.current.setAttribute('data-hover', 'default')
        }
      }
    }
    
    // Initialize aura position on first move to prevent it streaming from 0,0
    const onFirstMove = (e) => {
      auraPos.current = { x: e.clientX, y: e.clientY };
      window.removeEventListener('mousemove', onFirstMove);
    };
    window.addEventListener('mousemove', onFirstMove);
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      // Lerp for the trailing aura
      auraPos.current.x += (target.current.x - auraPos.current.x) * 0.09
      auraPos.current.y += (target.current.y - auraPos.current.y) * 0.09
      
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${auraPos.current.x}px, ${auraPos.current.y}px)`
      }
      requestAnimationFrame(animate)
    }
    const rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onFirstMove)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-part {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
        }

        /* 
          PART 1: DIAMOND (MAIN CURSOR)
          12x12px rotated 45deg 
        */
        .cursor-diamond-inner {
          width: 12px;
          height: 12px;
          border: 1.5px solid #FF4500;
          background-color: transparent;
          position: absolute;
          /* Center the 12x12 box */
          top: -6px;
          left: -6px;
          transform: rotate(45deg) scale(1);
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .cursor-part[data-hover="magnetic"].cursor-diamond-wrapper .cursor-diamond-inner {
          background-color: rgba(255, 69, 0, 0.9);
          transform: rotate(45deg) scale(1.3);
        }

        .cursor-part[data-hover="canvas"].cursor-diamond-wrapper .cursor-diamond-inner {
          border-color: #C0C0C0;
        }

        /* 
          PART 2: TRAILING AURA
          36x36px circular glow
        */
        .cursor-aura-inner {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,69,0,0.15) 0%, transparent 70%);
          border: 1px solid rgba(255,69,0,0.25);
          position: absolute;
          /* Center the 36x36 box */
          top: -18px;
          left: -18px;
          transform: scale(1);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .cursor-part[data-hover="magnetic"].cursor-aura-wrapper .cursor-aura-inner {
          /* Scale from 36 to 56: 56 / 36 = 1.555 */
          transform: scale(1.555);
        }

        .cursor-part[data-hover="canvas"].cursor-aura-wrapper .cursor-aura-inner {
          background: radial-gradient(circle, rgba(100,149,237,0.15) 0%, transparent 70%);
          border-color: rgba(100,149,237,0.25);
        }
      `}</style>

      {/* Trailing Aura (rendered first so it stays behind the diamond) */}
      <div ref={auraRef} className="cursor-part cursor-aura-wrapper" data-hover="default">
        <div className="cursor-aura-inner" />
      </div>

      {/* Main Diamond Cursor */}
      <div ref={diamondRef} className="cursor-part cursor-diamond-wrapper" data-hover="default">
        <div className="cursor-diamond-inner" />
      </div>
    </>
  )
}

export default CursorFollower
