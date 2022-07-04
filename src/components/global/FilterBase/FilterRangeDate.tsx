import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";

type TDate = [moment.Moment | null, moment.Moment | null];

type TProps = {
  placeholder: string;
  defaultValue?: TDate;
  handleDate: (val: (string | null)[]) => void;
  format?: string;
  showTime?: boolean;
};

export const FilterRangeDate: React.FC<TProps> = ({
  handleDate,
  placeholder,
  defaultValue,
  format = "DD/MM/YYYY",
  showTime = false,
}) => {
  const [date, setDate] = React.useState<TDate>(defaultValue || [null, null]);
  const [blur, setBlur] = useState(false);
  const onChangeDate = (dates: TDate | null) => {
    // console.log(dates);

    if (dates === null) {
      setDate([null, null]);
      handleDate([null, null]);
    } else {
      setDate(dates);
      handleDate(dates?.map((date) => (date ? moment(date).format() : null)));
    }
  };

  return (
    <div className="" key={!blur ? 1 : new Date().getTime()}>
      {/* <div className="absolute -top-3 left-4 text-xs bg-white p-1 z-50">
        {placeholder}
      </div> */}
      <DatePicker.RangePicker
        showTime={showTime}
        format={format}
        className="h-10 w-full !rounded-md !border-[#b6b4b4]"
        onBlur={(dates) =>
          console.log(moment.unix(dates.timeStamp * 1000).format("MM/DD/YYYY"))
        }
        onCalendarChange={onChangeDate}
        value={date}
      />
    </div>
  );
};
