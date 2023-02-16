import { HStack, Button, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";

export type HandleUserSubmitType = (name: string, avatar: string) => void;

interface Props {
  handleSubmit: HandleUserSubmitType;
  isDisabled: boolean;
}

export default function SelectUser(props: Props): JSX.Element {
  const { handleSubmit, isDisabled } = props;

  const [name, setName] = useState("Anonymous");
  const [avatar, setAvatar] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const onUpload = (): void => {
    if (ref?.current == null) return;
    ref?.current.click();
  };

  const onSubmit = () => {
    handleSubmit(name, avatar);
  };

  return (
    <HStack spacing={2}>
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder='Your Nickname'
      />
      <Button variant={"outline"} onClick={onUpload}>
        Upload Avatar
      </Button>
      <input
        hidden
        ref={ref}
        onChange={(e) => setAvatar(e.target.value)}
        type='file'
      ></input>
      <Button isDisabled={isDisabled} onClick={onSubmit}>
        Submit
      </Button>
    </HStack>
  );
}
