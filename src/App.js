import React from "react";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";
import { ModalsProvider } from "@mantine/modals";
import { Provider } from "react-redux";
import store from "./store/useColorStore";
import DynamicColors from "./DynamicColors";
import "@mantine/core/styles.css";
import "./global.css";

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <Toaster />
          <DynamicColors />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
