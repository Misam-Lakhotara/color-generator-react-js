import { MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import AddColor from "./DynamicColors";
import React from "react";
import "./global.css";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Toaster />
        <AddColor />
      </ModalsProvider>
    </MantineProvider>
  );
}
