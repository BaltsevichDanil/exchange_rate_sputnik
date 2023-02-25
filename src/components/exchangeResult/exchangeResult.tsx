import {ArrowForwardIcon} from '@chakra-ui/icons'
import {Center, HStack, Spinner, Text} from '@chakra-ui/react'
import {animate, motion, useMotionValue, useTransform} from 'framer-motion'
import {FC, useEffect, useRef} from 'react'

import ChakraBox from '../chackraBox/ChackraBox'

interface IProps {
  isOpen: 'open' | 'closed'
  loading: boolean
  exchangeInfo: IExchangeInfo
}

export interface IExchangeInfo {
  from: string
  fromAmount: number
  to: string
  toAmount: number
}

const ExchangeResult: FC<IProps> = ({isOpen, exchangeInfo, loading}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const divider = 2
  // mouse position
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / divider : 0
  )
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / divider : 0
  )

  const handleMouseMove = (e: MouseEvent): void => {
    // animate mouse x and y
    animate(mouseX, e.clientX)
    animate(mouseY, e.clientY)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    // recalculate grid on resize
    window.addEventListener('mousemove', handleMouseMove)
    // cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const dampen = 50
  const rotateX = useTransform<number, number>(mouseY, newMouseY => {
    if (!cardRef.current) {
      return 0
    }
    const rect = cardRef.current.getBoundingClientRect()
    const newRotateX = newMouseY - rect.top - rect.height
    return newRotateX / dampen
  })

  const rotateY = useTransform(mouseX, newMouseX => {
    if (!cardRef.current) {
      return 0
    }
    const rect = cardRef.current.getBoundingClientRect()
    const newRotateY = newMouseX - rect.left - rect.width / divider
    return newRotateY / dampen
  })

  const variants = {
    open: {scale: 1},
    closed: {scale: 0}
  }

  return (
    <ChakraBox w='full' initial='closed' animate={isOpen} variants={variants}>
      <ChakraBox
        w='full'
        transform-style='preserve-3d'
        as={motion.div}
        style={{rotateX, rotateY}}
      >
        <ChakraBox
          w='full'
          as={motion.div}
          backdrop-filter='blur(5px)'
          ref={cardRef}
        >
          <HStack
            w='full'
            padding='10'
            borderRadius='10'
            bgGradient='linear(to-r, #c31432, #240b36)'
            justifyContent='space-between'
            color='white'
            transform-style='preserve-3d'
          >
            {loading ? (
              <Center w='full'>
                <Spinner size='xl' />
              </Center>
            ) : (
              <>
                <Text fontWeight='bold' fontSize='4xl'>
                  {exchangeInfo.fromAmount} {exchangeInfo.from}
                </Text>
                <ArrowForwardIcon fontSize='4xl' />
                <Text fontWeight='bold' fontSize='4xl'>
                  {exchangeInfo.toAmount} {exchangeInfo.to}
                </Text>
              </>
            )}
          </HStack>
        </ChakraBox>
      </ChakraBox>
    </ChakraBox>
  )
}

export default ExchangeResult
