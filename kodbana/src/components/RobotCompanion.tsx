import { useEffect } from 'react'
import { motion } from 'framer-motion'

type Props = {
  message: string
}

export default function RobotCompanion({ message }: Props) {
  useEffect(() => {
    const synth = window.speechSynthesis
    const utter = new SpeechSynthesisUtterance(message)
    utter.lang = 'sv-SE'
    synth.cancel()
    synth.speak(utter)
  }, [message])

  return (
    <motion.div
      className="flex flex-col items-center text-center mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-6xl mb-2">🤖</div>
      <div className="bg-white text-kodbanaDark px-4 py-2 rounded-xl shadow max-w-xs text-sm">
        {message}
      </div>
    </motion.div>
  )
}
