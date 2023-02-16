import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { ReactNode } from "react";
import { Container, Flex } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: ReactNode;
}

export default function Root(props: Props): JSX.Element {
  const { children } = props;

  return (
    <Flex align='center' justify='center'>
      <Container py={4} maxW='container.xl'>
        {children}
      </Container>
    </Flex>
  );
}
