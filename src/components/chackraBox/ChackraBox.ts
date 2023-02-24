import {chakra, shouldForwardProp} from '@chakra-ui/react'
import {isValidMotionProp, motion} from 'framer-motion'

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

export default ChakraBox
