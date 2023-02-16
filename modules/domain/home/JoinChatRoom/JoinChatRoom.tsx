import { Button, Heading, HStack, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

interface Props {
  client: any;
}

export default function JoinChatRoom(props: Props): JSX.Element {
  const { client } = props;

  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  const onJoin = async (): Promise<void> => {
    if (client == null || id == null) return;
    router.push({
      pathname: "/room/[slug]",
      query: {
        slug: id,
      },
    });
  };

  return (
    <Stack spacing={2}>
      <Heading fontSize='sm'>Join Chat Room</Heading>
      <HStack>
        <Input
          onChange={(e) => setId(e.target.value)}
          placeholder='Chat Room ID'
        />
        <Button isDisabled={id == null || client == null} onClick={onJoin}>
          Join
        </Button>
      </HStack>
    </Stack>
  );
}
