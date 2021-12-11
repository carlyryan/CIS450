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
          'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
            {(props.stat && props.stat.heading ? props.stat.heading : default_content.heading)}
          </Heading>
          <Text color={'gray.500'}>
            {(props.stat && props.stat.body ? props.stat.body : default_content.body)}
          </Text>
        </Stack>

      </Box>
    </Box>
  );
}