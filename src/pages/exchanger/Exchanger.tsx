import {ArrowForwardIcon} from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import {animate, motion, useMotionValue, useTransform} from 'framer-motion'
import {FC, FormEvent, useEffect, useRef, useState} from 'react'

import ChakraBox from '../../components/chackraBox/ChackraBox'
import Form from '../../components/form/Form'
import PageWrapper from '../../components/pageWrapper/PageWrapper'

const Exchanger: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

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

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const minScale = 0.3
  const variants = {
    open: {opacity: 1, scale: 1},
    closed: {opacity: 0, scale: minScale}
  }

  return (
    <PageWrapper>
      <Form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Обменник:</FormLabel>
          <HStack spacing={2}>
            <Input placeholder='15 rub in usd' variant='filled' />
            <IconButton
              aria-label='Exchange'
              icon={<ArrowForwardIcon />}
              type='submit'
              colorScheme='teal'
            />
          </HStack>
        </FormControl>
      </Form>
      <ChakraBox
        w='full'
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
      >
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
              <Text fontWeight='bold' fontSize='4xl'>
                15 руб.
              </Text>
              <ArrowForwardIcon fontSize='4xl' />
              <Text fontWeight='bold' fontSize='4xl'>
                0.4 дол.
              </Text>
            </HStack>
          </ChakraBox>
        </ChakraBox>
      </ChakraBox>
    </PageWrapper>
  )
}

export default Exchanger
