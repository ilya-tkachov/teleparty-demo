import {
  HStack,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Wrap,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export type HandleUserSubmitType = (name: string, avatar: string) => void;

interface Props {
  handleSubmit: HandleUserSubmitType;
  isDisabled: boolean;
}

const avatars =
  "😀 😃 😄 😁 😆 😅 😂 🤣 🥲 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾".split(
    " "
  );

export default function SelectUser(props: Props): JSX.Element {
  const { handleSubmit, isDisabled } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("Anonymous");
  const [avatar, setAvatar] = useState("👻");

  const onSelect = (avatar: string): void => {
    setAvatar(avatar);
    onClose();
  };

  const onSubmit = () => {
    handleSubmit(name, avatar);
  };

  return (
    <>
      <HStack spacing={2}>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder='Your Nickname'
        />
        <Button variant={"outline"} onClick={onOpen}>
          {avatar === "👻" ? "Select Avatar" : avatar}
        </Button>
        <Button isDisabled={isDisabled} onClick={onSubmit}>
          Submit
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap>
              {avatars.map((item) => (
                <Button key={item} onClick={() => onSelect(item)}>
                  {item}
                </Button>
              ))}
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
