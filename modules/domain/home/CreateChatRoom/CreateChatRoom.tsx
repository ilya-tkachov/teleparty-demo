import { Button, Heading, HStack, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

interface Props {
  client: any;
}

export default function CreateChatRoom(props: Props): JSX.Element {
  const { client } = props;

  const [name, setName] = useState("Anonymous");
  const [newRoomId, setNewRoomId] = useState(null);
  const router = useRouter();

  const onCreate = async (): Promise<void> => {
    if (client == null) return;
    let roomId = await client.createChatRoom(name, "");
    router.push({
      pathname: "/room/[slug]",
      query: {
        slug: roomId,
        nick: name,
      },
    });
  };

  return (
    <Stack spacing={2}>
      <Heading fontSize='sm'>Create Chat Room</Heading>
      <HStack>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder='Your Nickname'
        />
        <Button isDisabled={client == null} onClick={onCreate}>
          Create
        </Button>
      </HStack>
    </Stack>
  );
}
