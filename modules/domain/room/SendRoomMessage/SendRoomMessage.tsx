import { HStack, Input, Button, Flex, Container } from "@chakra-ui/react";
import { useState } from "react";
import {
  TelepartyClient,
  SocketEventHandler,
  SocketMessageTypes,
} from "teleparty-websocket-lib";

interface Props {
  client: any;
}

export default function SendRoomMessage(props: Props): JSX.Element {
  const { client } = props;

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

  const onTyping = (): void => {
    if (message == null || client == null) return;
  };

  return (
    <Flex w='100%' position='fixed' bottom={0}>
      <Flex w='100%' align='center' justify='center'>
        <Container maxW='container.xl'>
          <HStack>
            <Input
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Type a message'
            />
            <Button isDisabled={client == null} onClick={onSendMessage}>
              Send
            </Button>
          </HStack>
        </Container>
      </Flex>
    </Flex>
  );
}
