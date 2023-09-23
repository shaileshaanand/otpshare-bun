import { format, sub } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

console.log(
  format(
    utcToZonedTime(
      sub(new Date(), {
        minutes: 10,
      }),
      "UTC"
    ),
    "yyyy-MM-dd HH:mm:ss"
  )
);
