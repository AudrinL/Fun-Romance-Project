'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  "Do you admit that I'm actually a nice person and not your enemy?",
  "Do you agree that sometimes you act a little… mysterious for no reason?",
  "Do you agree that communication is free… like literally 0 RWF?",
  "Do you agree that pushing me away is not part of the master plan?",
  "Do you agree that I'm here to build something real with you… not just vibes and confusion?",
]

const QUESTION_YES_TEXTS = [
  "Fine… Yes 🙄",
  "Okay okay, Yes 😒",
  "You win… Yes 😌",
  "Whatever, Yes 😪",
  "Ugh, fine. Yes 🙃",
]

const NO_RESPONSES = [
  "Hmm… that felt illegal. Try again.",
  "Wrong answer detected 🚨",
  "Are you okay? Blink twice and press Yes.",
  "System error: 'No' is not supported.",
  "You really thought you had options? Cute.",
]

const TERMS = [
  "You are required to communicate like a normal human being, not a disappearing ninja.",
  "Silent treatment is now officially outlawed.",
  "Random mood swings must come with at least a short explanation.",
  "You agree to stop overthinking things that are not even thinking about you.",
  "You accept that I am on your team, not your opponent.",
  "You will allow yourself to be cared for without acting like it's suspicious activity.",
  "You agree that building a future together requires both of us.",
  "You will reduce unnecessary stress in this relationship by at least 70%.",
  "You acknowledge that I actually like you… a lot.",
  "Running away emotionally is cancelled.",
]

// Typewriter text reveal component
function TypewriterText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setStarted(false)
    const startTimer = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(startTimer)
  }, [text, delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, 28)
    return () => clearTimeout(timer)
  }, [started, displayed, text])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

const FloatingHeart = ({ delay }: { delay: number }) => {
  const [leftPos, setLeftPos] = useState(0)

  useEffect(() => {
    setLeftPos(Math.random() * 100)
  }, [])

  return (
    <motion.div
      className="absolute text-pink-400 text-3xl pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: -100, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity }}
      style={{ left: `${leftPos}%` }}
    >
      ❤️
    </motion.div>
  )
}

export default function RomanticApp() {
  const [page, setPage] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [noAttempts, setNoAttempts] = useState(0)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  const handleYes = () => {
    if (page === 1) {
      setPage(2)
      setNoAttempts(0)
      setNoPosition({ x: 0, y: 0 })
    } else if (page === 2) {
      if (questionIndex < QUESTIONS.length - 1) {
        setQuestionIndex(questionIndex + 1)
        setNoAttempts(0)
        setNoPosition({ x: 0, y: 0 })
      } else {
        setPage(3)
        setNoAttempts(0)
        setNoPosition({ x: 0, y: 0 })
      }
    } else if (page === 3) {
      setPage(4)
      setNoAttempts(0)
      setNoPosition({ x: 0, y: 0 })
    } else if (page === 4) {
      setPage(5)
      setNoAttempts(0)
      setNoPosition({ x: 0, y: 0 })
    }
  }

  const handleNo = () => {
    setNoAttempts(noAttempts + 1)
    const randomX = Math.random() * (window.innerWidth - 100) - window.innerWidth / 2
    const randomY = Math.random() * (window.innerHeight - 100) - window.innerHeight / 2
    setNoPosition({ x: randomX, y: randomY })
  }

  const yesButtonScale = Math.pow(2, noAttempts)
  const noButtonScale = Math.max(0.1, 1 - noAttempts * 0.3)

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 relative">
      {page === 5 && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FloatingHeart key={i} delay={i * 0.4} />
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {page === 1 && (
            <motion.div
              key="page1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-5xl"
            >
              <Page1
                noAttempts={noAttempts}
                onYes={handleYes}
                onNo={handleNo}
                noButtonScale={noButtonScale}
                noPosition={noPosition}
                yesScale={yesButtonScale}
              />
            </motion.div>
          )}

          {page === 2 && (
            <motion.div
              key="page2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-lg w-full"
            >
              <Page2
                questionIndex={questionIndex}
                noAttempts={noAttempts}
                onYes={handleYes}
                onNo={handleNo}
                noButtonScale={noButtonScale}
                noPosition={noPosition}
                yesScale={yesButtonScale}
              />
            </motion.div>
          )}

          {page === 3 && (
            <motion.div
              key="page3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl w-full"
            >
              <Page3
                onYes={handleYes}
                onNo={handleNo}
                noButtonScale={noButtonScale}
                noPosition={noPosition}
                yesScale={yesButtonScale}
              />
            </motion.div>
          )}

          {page === 4 && (
            <motion.div
              key="page4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-2xl w-full"
            >
              {/* FIX: Pass setPage instead of nothing, and Page4 uses setPage(5) */}
              <Page4 setPage={setPage} />
            </motion.div>
          )}

          {page === 5 && (
            <motion.div
              key="page5"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-lg w-full"
            >
              <Page5 onHome={() => setPage(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Page1({
  noAttempts,
  onYes,
  onNo,
  noButtonScale,
  noPosition,
  yesScale,
}: {
  noAttempts: number
  onYes: () => void
  onNo: () => void
  noButtonScale: number
  noPosition: { x: number; y: number }
  yesScale: number
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center">
      <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-yscjSyqJzwh28AuKFAn7wYFZlAalzq.png"
          alt="Smiling woman in white dress"
          className="max-w-[198px] h-auto object-contain"
        />
      </div>
      <motion.div className="text-center space-y-8 flex-shrink-0">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
            Before we continue…
          </h1>
          <p className="text-xl text-gray-700">
            Do you promise to be honest and not click No like a criminal? 😌
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center relative">
          <motion.button
            onClick={onYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.1 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
          >
            YES 😌
          </motion.button>

          <motion.button
            onClick={onNo}
            animate={{ x: noPosition.x, y: noPosition.y, scale: noButtonScale }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="px-8 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 rounded-full font-bold text-lg hover:shadow-lg transition-shadow whitespace-nowrap"
          >
            NO 🤨
          </motion.button>
        </div>

        {noAttempts > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 font-semibold"
          >
            {NO_RESPONSES[Math.min(noAttempts - 1, NO_RESPONSES.length - 1)]}
          </motion.p>
        )}
      </motion.div>
      <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LUCCC-YQ4opdYYTyyohreUF8tH3TD65vXIkg.png"
          alt="Man in blue suit with sunglasses"
          className="max-w-[198px] h-auto object-contain"
        />
      </div>
    </div>
  )
}

function Page2({
  questionIndex,
  noAttempts,
  onYes,
  onNo,
  noButtonScale,
  noPosition,
  yesScale,
}: {
  questionIndex: number
  noAttempts: number
  onYes: () => void
  onNo: () => void
  noButtonScale: number
  noPosition: { x: number; y: number }
  yesScale: number
}) {
  const question = QUESTIONS[questionIndex]
  const showHighlight = questionIndex === 2

  return (
    <motion.div className="text-center space-y-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-pink-600">
          Question {questionIndex + 1}/{QUESTIONS.length}
        </span>
        <div className="flex gap-1">
          {[...Array(QUESTIONS.length)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i <= questionIndex ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={questionIndex}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-2xl text-gray-800 font-semibold leading-relaxed"
      >
        {showHighlight ? (
          <span>
            Do you agree that{' '}
            <span className="bg-gradient-to-r from-pink-300 to-red-300 px-2 py-1 rounded">
              communication is free… like literally 0 RWF?
            </span>
          </span>
        ) : (
          question
        )}
      </motion.div>

      <div className="flex flex-col gap-4 items-center justify-center relative">
        <motion.button
          onClick={onYes}
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.1 }}
          whileTap={{ scale: yesScale * 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
        >
          {QUESTION_YES_TEXTS[questionIndex % QUESTION_YES_TEXTS.length]}
        </motion.button>

        <motion.button
          onClick={onNo}
          animate={{ x: noPosition.x, y: noPosition.y, scale: noButtonScale }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="px-8 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 rounded-full font-bold text-lg hover:shadow-lg transition-shadow whitespace-nowrap"
        >
          NO 🤨
        </motion.button>
      </div>

      {noAttempts > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 font-semibold"
        >
          {NO_RESPONSES[Math.min(noAttempts - 1, NO_RESPONSES.length - 1)]}
        </motion.p>
      )}
    </motion.div>
  )
}

function Page3({
  onYes,
  onNo,
  noButtonScale,
  noPosition,
  yesScale,
}: {
  onYes: () => void
  onNo: () => void
  noButtonScale: number
  noPosition: { x: number; y: number }
  yesScale: number
}) {
  const [girlConfirmed, setGirlConfirmed] = useState(false)
  const [noAttemptsOnPage3, setNoAttemptsOnPage3] = useState(0)

  const handleYesClick = () => {
    setGirlConfirmed(true)
    setNoAttemptsOnPage3(0)
  }

  const handleNoClick = () => {
    setNoAttemptsOnPage3(noAttemptsOnPage3 + 1)
    onNo()
  }

  return (
    <div className="text-center space-y-12 w-full">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
        Relationship Terms & Conditions v2.0
      </h1>

      <div className="bg-white/80 backdrop-blur rounded-2xl p-8 space-y-4 shadow-xl max-h-64 overflow-y-auto">
        {TERMS.map((term, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 text-left items-start"
          >
            <span className="text-2xl text-pink-500 flex-shrink-0">✓</span>
            <p className="text-gray-700 leading-relaxed">{term}</p>
          </motion.div>
        ))}
      </div>

      {/* No layout prop - plain div to avoid interfering with AnimatePresence */}
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        <div className="relative flex flex-col items-center">
          <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LUCCC1-ClAov2omzcZ01lfB7j2jH2PyENfLjP.png"
              alt="Man with sunglasses"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="mt-8 max-w-xs bg-white text-black px-6 py-4 rounded-2xl font-bold text-sm text-center shadow-lg border-4 border-black"
          >
            "After reading all that, you agree to it, right? Or are we doing this the hard way? 😏"
          </motion.div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mukaa-YleYFrpiffpuSHvneoDRaWUO4WYl3y.png"
              alt="Woman smiling"
              className="w-full h-full object-cover"
            />
          </div>
          <AnimatePresence>
            {girlConfirmed && (
              <motion.div
                key="girl-bubble"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
                className="mt-8 max-w-xs bg-white text-black px-6 py-4 rounded-2xl font-bold text-sm text-center shadow-lg border-4 border-black"
              >
                <TypewriterText
                  text={`"I, the Mighty MUKASHYAKA NKIKO BIHANGA aka Tooth Portal, shall honor these Terms & Conditions… mostly seriously 😜✨"`}
                  delay={0.4}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!girlConfirmed ? (
          <motion.div
            key="yes-no-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-4 items-center justify-center"
          >
            <motion.button
              onClick={handleYesClick}
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale * 1.1 }}
              whileTap={{ scale: yesScale * 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
            >
              YES
            </motion.button>

            <motion.button
              onClick={handleNoClick}
              animate={{ x: noPosition.x, y: noPosition.y, scale: noButtonScale }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-8 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 rounded-full font-bold text-lg hover:shadow-lg transition-shadow whitespace-nowrap"
            >
              NO
            </motion.button>

            {noAttemptsOnPage3 > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 font-semibold"
              >
                {NO_RESPONSES[Math.min(noAttemptsOnPage3 - 1, NO_RESPONSES.length - 1)]}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="proceed-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* FIX: calls onYes which goes through handleYes → setPage(4) cleanly */}
            <motion.button
              onClick={onYes}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
            >
              Proceed… if you dare
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// FIX: Changed prop from { onYes } to { setPage } to match how it's called in the parent
function Page4({ setPage }: { setPage: (page: number) => void }) {
  return (
    <motion.div className="text-center space-y-8">
      <motion.div
        className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl p-12 shadow-2xl space-y-6"
        animate={{
          boxShadow: [
            '0 0 20px rgba(236, 72, 153, 0.3)',
            '0 0 40px rgba(236, 72, 153, 0.5)',
            '0 0 20px rgba(236, 72, 153, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
          Congratulations
        </h2>

        <div className="space-y-4">
          <p className="text-xl text-gray-800 leading-relaxed">
            You have successfully made the only correct decisions in this app.
          </p>
          <p className="text-xl text-gray-800 font-semibold">
            I always knew you were smart... eventually
          </p>
        </div>
      </motion.div>

      <motion.button
        onClick={() => setPage(5)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
      >
        I Accept (I had no choice anyway) 😌
      </motion.button>
    </motion.div>
  )
}

function Page5({ onHome }: { onHome: () => void }) {
  return (
    <motion.div className="text-center space-y-8">
      <motion.div
        className="bg-white/90 backdrop-blur rounded-3xl p-12 shadow-2xl space-y-8 relative overflow-hidden border-2 border-pink-200"
        animate={{
          boxShadow: [
            '0 0 20px rgba(236, 72, 153, 0.2)',
            '0 0 50px rgba(236, 72, 153, 0.4)',
            '0 0 20px rgba(236, 72, 153, 0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400 text-2xl pointer-events-none"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${-10 - i * 5}%`,
            }}
          >
            ❤️
          </motion.div>
        ))}

        <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
          <p className="text-2xl font-bold text-pink-600">Okay jokes aside for a second.</p>
          <p>I made this to make you smile, but also say something real.</p>
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
            I like you. I care about you. I&apos;m trying to build something real with you.
          </p>
          <p>But sometimes the way you act pushes me away, even when I&apos;m trying to come closer.</p>
          <p>You don&apos;t have to handle everything alone. <span className="font-bold">I&apos;m right here.</span></p>
          <p><span className="font-bold">You can trust me.</span></p>
          <p>Just don&apos;t make it hard for me to stay close when all I&apos;m trying to do is build something good with you.</p>
          <p className="text-lg italic">Also… please stop acting like that 😌</p>
          <p className="text-lg italic">I&apos;m planning a future here, not auditioning for confusion season 5.</p>
        </div>
      </motion.div>

      <motion.button
        onClick={onHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
      >
        Back Home… and behave yourself 😌
      </motion.button>
    </motion.div>
  )
}