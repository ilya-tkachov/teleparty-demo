import { Stack, Box, Text, Heading, Avatar, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";
import { MessageType, TypingType } from "../Room";

interface Props {
  messages: MessageType;
}

export default function ViewMessages(props: Props): JSX.Element {
  const { messages } = props;

  return (
    <Stack spacing={2}>
      {messages.map((item) => (
        <HStack spacing={2} key={item.timestamp}>
          <Avatar size={"sm"} src={item.userIcon} />
          <Stack spacing={2}>
            <Heading fontSize='sm'>{item.userNickname}</Heading>
            <Text fontSize='sm'>{item.body}</Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
}
