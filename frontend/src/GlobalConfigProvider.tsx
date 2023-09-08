import React from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import api from "api/api";

const GlobalConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const props = {
    token: { colorPrimary: "#999" },
    components: { Button: { colorPrimary: "#000" } },
  };

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => api.get(url).then((res) => res.data),
      }}
    >
      <ConfigProvider theme={props}>{children}</ConfigProvider>
    </SWRConfig>
  );
};

export default GlobalConfigProvider;
