import { Stack, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

interface Props {
  messages: any[];
}

export default function ViewMessages(props: Props): JSX.Element {
  const { messages } = props;

  return (
    <Stack spacing={2}>
      {messages.map((item) => (
        <Box key={item.timestamp}>
          <Text fontSize='sm'>{item.userNickname}</Text>
          <Text fontSize='sm'>{item.body}</Text>
        </Box>
      ))}
    </Stack>
  );
}
