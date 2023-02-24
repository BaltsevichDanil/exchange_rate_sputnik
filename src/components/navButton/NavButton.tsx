import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import {Box, Button, Flex, Text} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import {FC, ReactNode} from 'react'
import {useNavigate} from 'react-router-dom'

interface IProps {
  link: string
  text: string
  dir: 'prev' | 'next'
}

const NavButton: FC<IProps> = props => {
  const navigate = useNavigate()

  const arrow = (): ReactNode =>
    props.dir === 'next' ? <ArrowForwardIcon /> : <ArrowBackIcon />

  const arrowJustify = props.dir === 'next' ? 'end' : 'start'

  const buttonMotion = {
    rest: {
      width: 20
    },
    hover: {
      width: 200
    }
  }

  const textMotion = {
    rest: {
      width: 0,
      scale: 0
    },
    hover: {
      width: 100,
      scale: 1
    }
  }

  const arrowMotion = {
    rest: {
      scale: 1
    },
    hover: {
      scale: 0,
      width: 0
    }
  }

  const onClick = (): void => navigate(props.link)

  return (
    <Flex w='full' justifyContent={arrowJustify}>
      <Box as={motion.div} initial='rest' whileHover='hover' animate='rest'>
        <Button
          borderRadius='full'
          as={motion.div}
          variants={buttonMotion}
          onClick={onClick}
        >
          <Text as={motion.div} variants={textMotion}>
            {props.text}
          </Text>
          <Box as={motion.div} variants={arrowMotion}>
            {arrow()}
          </Box>
        </Button>
      </Box>
    </Flex>
  )
}

export default NavButton
