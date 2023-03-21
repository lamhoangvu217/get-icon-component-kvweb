import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { RenderIcon } from "@/components/RenderIcon";
import { UploadIcon } from "@/components/UploadIcon";
import { ListIcon } from "@/components/ListIcon";
import { SearchIcon } from "@/components/SearchIcon";

export default function Home() {
  return (
    <>
      <Head>
        <title>Get Icon (KVWeb DesignSystem)</title>
      </Head>
      <Text fontSize="4xl" align={"center"} mt={4}>
        Get Icon (KVWeb DesignSystem)
      </Text>
      <Container mt={8}>
        <Tabs>
          <TabList>
            <Tab>Render Icon </Tab>
            <Tab>Check Icon exists</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <RenderIcon />
            </TabPanel>
            {/* <TabPanel>
              <UploadIcon />
            </TabPanel> */}
            <TabPanel>
              <SearchIcon />
              <ListIcon />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}
