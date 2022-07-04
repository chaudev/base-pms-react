import React from "react";

type TProps = {
  title: string;
};

const TitlePage: React.FC<TProps> = ({ title }) => {
  return (
    <div>
      <span className="text-xl font-semibold text-main flex items-center">
        {title}
      </span>
    </div>
  );
};

export default TitlePage;
