import dayjs from "dayjs";

export default function TimeFormat({ time, type }) {
  return <>{type === "time" ? dayjs(time).format("YYYY-MM-DD hh:mm:ss") : dayjs(time).format("YYYY-MM-DD")}</>;
}
