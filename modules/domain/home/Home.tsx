import { Heading, Stack, Text, Center, Spinner } from "@chakra-ui/react";
import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";
import CreateChatRoom from "./CreateChatRoom/CreateChatRoom";
import { useEffect, useState } from "react";
import JoinChatRoom from "./JoinChatRoom/JoinChatRoom";
import { TelepartyType } from "@/modules/types";

export default function Home(): JSX.Element {
  const [client, setClient] = useState<TelepartyType>();

  useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => {
        setClient(newClient);
      },
      onClose: () => {
        console.log("Socket has been closed");
      },
      onMessage: (message) => {
        console.log("Received message: " + JSON.stringify(message));
      },
    };
    const newClient = new TelepartyClient(eventHandler);

    return () => {
      newClient.teardown();
    };
  }, []);

  if (client == null) {
    <Center>
      <Spinner />
    </Center>;
  }

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <Heading fontSize='xl'>Teleparty Chat Room Demo</Heading>
        <Text>by ilya.tkachov@hotmail.com</Text>
      </Stack>
      <CreateChatRoom client={client} />
      <JoinChatRoom client={client} />
    </Stack>
  );
}
