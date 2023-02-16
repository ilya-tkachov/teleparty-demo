import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TelepartyClient,
  SocketEventHandler,
  MessageList,
  SessionChatMessage,
} from "teleparty-websocket-lib";
import { Stack, Heading } from "@chakra-ui/react";
import ViewMessages from "./ViewMessages/ViewMessages";
import SendRoomMessage from "./SendRoomMessage/SendRoomMessage";
import SelectUser, { HandleUserSubmitType } from "../components/SelectUser";
import { TelepartyType } from "@/modules/types";

export type MessageType = SessionChatMessage[];
export type TypingType = string[];

export default function Room(): JSX.Element {
  const [client, setClient] = useState<TelepartyType>();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType>([]);
  const [typing, setTyping] = useState<TypingType>([]);

  const handleSubmit: HandleUserSubmitType = (name, avatar) => {
    router.push({
      pathname: "/room/[slug]",
      query: {
        slug: router.query.slug,
        nick: name,
        avatar: avatar,
      },
    });
  };

  const joinRoom = () => {
    if (client == null || router?.query?.nick == null) return;
    client
      .joinChatRoom(
        (router?.query?.nick as string) ?? "Anonymous",
        router.query.slug as string,
        (router?.query?.avatar as string) ?? ""
      )
      .then((messages) => {
        setMessages(messages.messages);
      });
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
          case "setTypingPresence":
            setTyping(message.data.usersTyping);
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
        <SelectUser isDisabled={client == null} handleSubmit={handleSubmit} />
      </Stack>
    );
  }

  return (
    <Stack pb={16} spacing={8}>
      <Heading fontSize='lg'>Room {router.query.slug}</Heading>
      <ViewMessages messages={messages} />
      <SendRoomMessage client={client} typing={typing} />
    </Stack>
  );
}
