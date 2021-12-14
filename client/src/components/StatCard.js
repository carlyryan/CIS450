// import Image from 'next/image';
import {
  Image,
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';


export default function StatCard(props) {
  const default_content = {
    heading: "Austing is a sleepless city",
    body: "Insert statistic about austin and the yelps there. Have this stat come from a "
      + "query that is generated in real time."
  }

  return (
    <Box
      maxW={'445px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      m={6}
    >
      <Image
        src={
          'https://res.cloudinary.com/maa/image/upload/c_lfill,g_auto,f_auto,q_auto:eco,h_1252,w_2160/v1/maac/-/media/images/metro-landing-page-heros/austin_tx.jpg'
        }
        layout={'fill'}
      />
      <Box p={6}>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Trending Stat
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {(props.heading ? props.heading : default_content.heading)}
          </Heading>
          <Text color={'gray.500'}>
            {(props.body ? props.body : default_content.body)}
          </Text>
        </Stack>

      </Box>
    </Box>
  );
}