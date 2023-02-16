import { Stack, Text, Heading, Avatar, HStack } from "@chakra-ui/react";
import { MessageType } from "../Room";

interface Props {
  messages: MessageType;
}

export default function ViewMessages(props: Props): JSX.Element {
  const { messages } = props;

  return (
    <Stack spacing={2}>
      {messages.map((item) => (
        <HStack
          spacing={2}
          key={item.timestamp}
          align='flex-start'
          justify='space-between'
        >
          <HStack align='flex-start' spacing={2}>
            <Text fontSize='3xl'>{item.userIcon}</Text>
            <Stack spacing={1}>
              <Heading fontSize='sm'>{item.userNickname}</Heading>
              <Text wordBreak='break-all' fontSize='sm'>
                {item.body}
              </Text>
            </Stack>
          </HStack>
          <Text color='gray.500' fontSize='sm'>
            {item.timestamp}
          </Text>
        </HStack>
      ))}
    </Stack>
  );
}
