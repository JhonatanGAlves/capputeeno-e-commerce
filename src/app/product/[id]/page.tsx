"use client";
import { useContext } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Product from "@/components/product/Product";
import GlobalNotification from "@/components/global-notification/GlobalNotification";
import { CapputeenoContext } from "@/context/CapputeenoContext";

export default function ProductPage() {
  const { showNotificationAlert, setShowNotificationAlert } =
    useContext(CapputeenoContext);
  const client = new QueryClient();

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  return (
    <QueryClientProvider client={client}>
      <main
        className={`flex flex-col ${responsivePadding} pt-[2.125rem] pb-[3.75rem]`}
      >
        <Product />

        <GlobalNotification
          show={showNotificationAlert.showAlert}
          message={showNotificationAlert.message}
          description={showNotificationAlert.description}
          onClose={(close) =>
            setShowNotificationAlert({
              message: "",
              showAlert: close,
              description: "",
            })
          }
          timeToClose={7000}
        />
      </main>
    </QueryClientProvider>
  );
}
