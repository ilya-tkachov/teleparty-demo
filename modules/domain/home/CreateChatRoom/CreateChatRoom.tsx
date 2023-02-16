import { Button, Heading, HStack, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import SelectUser from "../../components/SelectUser";
import { HandleUserSubmitType } from "../../components/SelectUser";

interface Props {
  client: any;
}

export default function CreateChatRoom(props: Props): JSX.Element {
  const { client } = props;

  const router = useRouter();

  const handleSubmit: HandleUserSubmitType = async (name, avatar) => {
    let roomId = await client.createChatRoom(name, avatar);
    router.push({
      pathname: "/room/[slug]",
      query: {
        slug: roomId,
        nick: name,
        avatar: avatar,
      },
    });
  };

  return (
    <Stack spacing={2}>
      <Heading fontSize='sm'>Create Chat Room</Heading>
      <SelectUser isDisabled={client == null} handleSubmit={handleSubmit} />
    </Stack>
  );
}
