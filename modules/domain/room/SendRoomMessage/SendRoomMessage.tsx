import {
  HStack,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SocketMessageTypes } from "teleparty-websocket-lib";
import { TypingType } from "../Room";

interface Props {
  client: any;
  typing: TypingType;
}

export default function SendRoomMessage(props: Props): JSX.Element {
  const { client, typing } = props;

  const [message, setMessage] = useState<string | null>(null);

  const onSendMessage = (): void => {
    if (message == null || client == null) return;
    client.sendMessage(
      SocketMessageTypes.SEND_MESSAGE,
      {
        body: message,
      },
      () => console.log("sent")
    );
  };

  const startTyping = (): void => {
    if (message == null || client == null) return;
    client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      typing: true,
    });
  };

  const stopTyping = (): void => {
    if (message == null || client == null) return;
    client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      typing: false,
    });
  };

  useEffect(() => {
    if (message == null || message.trim() === "") return;
    startTyping();
    const timer = setTimeout(() => {
      stopTyping();
    }, 1000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Flex
      w='100%'
      align='center'
      justify='center'
      position='fixed'
      bottom={0}
      left={0}
      right={0}
    >
      <Stack
        borderRadius='md'
        bg='gray.900'
        p={2}
        maxW='container.sm'
        w='100%'
        spacing={2}
      >
        {typing.length > 0 && (
          <Heading fontSize='md'>{typing.join(", ")} are typing...</Heading>
        )}
        <HStack>
          <Input
            variant='filled'
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type a message'
          />
          <Button isDisabled={client == null} onClick={onSendMessage}>
            Send
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
