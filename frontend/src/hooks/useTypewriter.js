import { useState, useEffect } from 'react'

const useTypewriter = (text, speed = 30, trigger = true) => {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!trigger) return
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, trigger, speed])
  return displayed
}

export default useTypewriter
