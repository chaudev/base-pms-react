import clsx from "clsx";
import React, { ReactElement, useCallback, useState } from "react";
import { TlayoutWithChild } from "~src/types/layout";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./SideBar";
import styles from "./index.module.css";
import { signIn, useSession } from "next-auth/react";
import { Loading } from "~src/components/screen/status/Loading";

type TProps = {
  breadcrumb?: string;
  userPage?: boolean;
  children?: React.ReactNode;
};

export const MainLayout: TlayoutWithChild & React.FC<TProps> = ({
  children,
}) => {
  const { data: session, status } = useSession();

  const [hover, setHover] = useState(true);
  const handleHover = useCallback((bool: boolean) => setHover(bool), []);

  if (status === "loading") return <Loading />;

  if (!session) {
    signIn();
    return <Loading />;
  }

  return (
    <div className={clsx(styles.container)}>
      <Header />
      <div className="flex">
        <Sidebar {...{ hover, handleHover }} />
        <main
          className={clsx(
            styles.main,
            hover && "pl-[324px] pr-[20px]",
            !hover && "pl-[84px] pr-[20px]",
            "w-[100%]  mt-[68px] min-h-[900px]"
          )}
        >
          {children}
        </main>
      </div>
      <div className={clsx(styles.footer, hover && "ml-[234px]", !hover && "")}>
        <Footer {...{ hover }} />
      </div>
    </div>
  );
};

MainLayout.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
