import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";
import { Stack, Heading, HStack, Input, Button } from "@chakra-ui/react";
import ViewMessages from "./ViewMessages/ViewMessages";
import SendRoomMessage from "./SendRoomMessage/SendRoomMessage";

export default function Room(): JSX.Element {
  const [client, setClient] = useState<typeof TelepartyClient>();
  const [nickname, setNickname] = useState("Anonymous");
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);

  const onEnterNickname = (): void => {
    console.log(nickname);
    router.push({
      pathname: "/room/[slug]",
      query: {
        slug: router.query.slug,
        nick: nickname,
      },
    });
  };

  const joinRoom = () => {
    if (client == null || router?.query?.nick == null) return;
    client.joinChatRoom(router.query.nick, router.query.slug, "");
  };

  useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => {
        setClient(newClient);
        joinRoom();
      },
      onClose: () => {
        console.log("Socket has been closed");
      },
      onMessage: (message) => {
        switch (message.type) {
          case "sendMessage":
            setMessages((val) => [...val, message.data]);
            break;
          default:
            console.log(JSON.stringify(message));
        }
      },
    };
    const newClient = new TelepartyClient(eventHandler);

    return () => {
      newClient.teardown();
    };
  }, []);

  useEffect(() => {
    if (client == null) return;
    joinRoom();
  }, [router.query.nick, client]);

  if (router.query.nick == null) {
    return (
      <Stack spacing={2}>
        <Heading fontSize='sm'>Enter Chat Room</Heading>
        <HStack>
          <Input
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Your Nickname'
          />
          <Button isDisabled={client == null} onClick={onEnterNickname}>
            Enter Room
          </Button>
        </HStack>
      </Stack>
    );
  }

  return (
    <Stack spacing={8}>
      <Heading fontSize='lg'>Room {router.query.slug}</Heading>
      <ViewMessages messages={messages} />
      <SendRoomMessage client={client} />
    </Stack>
  );
}
