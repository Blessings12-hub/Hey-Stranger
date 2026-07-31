import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { opener, slides } from './data/slides'
import './App.css'

const MOTE_COUNT = 14

function Motes() {
  const motes = useMemo(
    () =>
      Array.from({ length: MOTE_COUNT }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 14,
      })),
    []
  )
  return (
    <div className="dust" aria-hidden="true">
      {motes.map((m) => (
        <span
          key={m.id}
          className="mote"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            bottom: -20,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

const SPARKLE_COUNT = 11

function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
        id: i,
        top: 6 + Math.random() * 58,
        left: 5 + Math.random() * 90,
        size: 10 + Math.random() * 16,
        delay: Math.random() * 4,
        duration: 2.2 + Math.random() * 2.4,
      })),
    []
  )
  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          {'\u2726'}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)
  const touchStartX = useRef(null)

  const total = slides.length

  const goNext = () => setIndex((i) => Math.min(i + 1, total - 1))
  const goPrev = () => setIndex((i) => Math.max(i - 1, 0))

  const begin = async () => {
    setStarted(true)
    const audio = audioRef.current
    if (!audio) return
    try {
      audio.currentTime = 0
      audio.volume = 1
      await audio.play()
    } catch (e) {
      // Some mobile browsers still refuse here even after a tap. Fall back
      // to starting playback on the very next touch/click anywhere on the
      // page, which is always allowed since it's a fresh user gesture.
      const retry = () => {
        audio.play().catch(() => {})
        window.removeEventListener('pointerdown', retry)
      }
      window.addEventListener('pointerdown', retry, { once: true })
    }
  }

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m
      if (audioRef.current) audioRef.current.muted = next
      return next
    })
  }

  useEffect(() => {
    const onKey = (e) => {
      if (!started) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const current = slides[index]
  const isLongText = current.text.length > 200

  return (
    <div className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Motes />
      <div className="vignette" />

      <audio ref={audioRef} src="/audio/those-eyes.mp3" loop muted={muted} preload="auto" />

      {!started && (
        <div className="opener">
          <img className="opener-bg" src={opener.photo} alt="" />
          <div className="opener-scrim" />
          <Sparkles />
          <div className="opener-content">
            <div className="eyebrow">{opener.eyebrow}</div>
            <h1 className="opener-title">{opener.title}</h1>
            <p className="opener-subtitle">{opener.subtitle}</p>
            <button className="begin-btn" onClick={begin}>
              Begin
            </button>
          </div>
        </div>
      )}

      {started && (
        <>
          <div className="thread">
            {slides.map((_, i) => (
              <div className="thread-seg" key={i}>
                <div
                  className="thread-fill"
                  style={{ width: i < index ? '100%' : i === index ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>

          <button className="sound-toggle" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? '\u{1F507}' : '\u{1F3B5}'}
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="card-layer"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div className="card-photo-wrap">
                <img className="card-photo" src={current.photo} alt="" />
                <div className="card-scrim" />
              </div>
              <div className={`card-text-wrap${isLongText ? ' card-text-wrap--long' : ''}`}>
                <div className="card-index">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
                <motion.p
                  className="card-text"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                >
                  {current.text}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="nav-zones">
            <button className="nav-zone" onClick={goPrev} aria-label="Previous" />
            <button className="nav-zone" onClick={goNext} aria-label="Next" />
          </div>

          {index === 0 && <div className="hint">tap or swipe</div>}
        </>
      )}
    </div>
  )
}
