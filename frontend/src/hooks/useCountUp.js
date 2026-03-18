import { useState, useEffect } from 'react'

const useCountUp = (targetStr, duration = 1500, trigger = true) => {
  const [count, setCount] = useState('0')

  useEffect(() => {
    if (!trigger) return
    if (targetStr === '∞') {
      const timeout = setTimeout(() => setCount('∞'), duration / 2)
      return () => clearTimeout(timeout)
    }

    const numEnd = parseInt(targetStr.replace(/\D/g, '')) || 0
    const suffix = targetStr.replace(/\d/g, '')

    let start = 0
    const step = numEnd / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= numEnd) {
        setCount(targetStr)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start) + suffix)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [targetStr, trigger, duration])

  return count
}

export default useCountUp
