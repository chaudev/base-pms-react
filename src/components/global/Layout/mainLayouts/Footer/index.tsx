import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";

type TProps = {
  hover: boolean;
};

const Footer: React.FC<TProps> = ({ hover }) => {
  return (
    <footer className={clsx(styles.footer)}>
      <p className="text-xs w-full md:pt-0 pt-2 xl:text-left text-center">
        © 2021 PMS MONA MEDIA All rights reserved.
      </p>
      <p className="text-xs w-full md:text-right  xl:text-right text-center">
        PMS.MONAMEDIA.NET Version: 1.0
      </p>
    </footer>
  );
};

export default Footer;
