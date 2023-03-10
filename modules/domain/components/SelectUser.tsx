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
  "๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ ๐ฅฒ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฅฐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐คจ ๐ง ๐ค ๐ ๐ฅธ ๐คฉ ๐ฅณ ๐ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ๐ฅบ ๐ข ๐ญ ๐ฎโ๐จ ๐ค ๐  ๐ก ๐คฌ ๐คฏ ๐ณ ๐ฅต ๐ฅถ ๐ฑ ๐จ ๐ฐ ๐ฅ ๐ ๐ค ๐ค ๐คญ ๐คซ ๐คฅ ๐ถ ๐ถโ๐ซ๏ธ ๐ ๐ ๐ฌ ๐ ๐ฏ ๐ฆ ๐ง ๐ฎ ๐ฒ ๐ฅฑ ๐ด ๐คค ๐ช ๐ต ๐ตโ๐ซ ๐ค ๐ฅด ๐คข ๐คฎ ๐คง ๐ท ๐ค ๐ค ๐ค ๐ค  ๐ ๐ฟ ๐น ๐บ ๐คก ๐ฉ ๐ป ๐ โ ๏ธ ๐ฝ ๐พ ๐ค ๐ ๐บ ๐ธ ๐น ๐ป ๐ผ ๐ฝ ๐ ๐ฟ ๐พ".split(
    " "
  );

export default function SelectUser(props: Props): JSX.Element {
  const { handleSubmit, isDisabled } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("Anonymous");
  const [avatar, setAvatar] = useState("๐ป");

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
          {avatar === "๐ป" ? "Select Avatar" : avatar}
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
