import { formatDistanceToNow } from "date-fns";
import { toDate } from "date-fns-tz";
import * as elements from "typed-html";

const Otp = ({
  otp,
  createdAt,
  id,
}: {
  otp: number;
  createdAt: string;
  id: number;
}) => {
  const parsedDate = toDate(createdAt, { timeZone: "UTC" });
  return (
    <div
      class="flex border-2 rounded-lg w-60 p-2 border-blue-900 hover:shadow-xl transition-all duration-300"
      onclick={`copy(${otp})`}
    >
      <img src="/assets/swiggy.svg" alt="" class=" w-8" />
      <div class="w-full flex flex-col justify-between pt-1">
        <div class="text-2xl font-bold text-center font-mono flex w-full items-center justify-center">
          <p class="mt-0.5">{otp}</p>
          <img
            src="/assets/clipboard.svg"
            alt=""
            hx-post={`/otp/${id}/claim`}
            hx-trigger="click"
          />
        </div>
        <p class="text-xs text-gray-700 text-center">
          {formatDistanceToNow(parsedDate)} ago
        </p>
      </div>
    </div>
  );
};

export default Otp;
