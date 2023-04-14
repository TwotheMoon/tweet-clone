import Link from "next/link";

interface ItemProps {
  id: number;
  message?: string;
  tweetImg?: string;
  createDate: Date;
  userId: number;
  userName: string;
  likesCount: number;
}

export default function Item({
  id,
  message,
  tweetImg,
  createDate,
  userName,
  likesCount,
}: ItemProps) {
  return (
    <Link href={`/tweet/${id}`} legacyBehavior>
      <a className="flex flex-col px-4 pt-5 cursor-pointer justify-between">
        <img
          src={`https://imagedelivery.net/fK9Ldk_N-eAkzLp8FgDW2A/${tweetImg}/public`}
        />
        <div className="flex space-x-4">
          <div className="pt-2 flex flex-col">
            <h3 className="text-sm font-bold text-gray-900">
              {userName}
              <span className="font-medium ml-4">
                {createDate.toString().substring(0, 10)}
              </span>
            </h3>
            <span className="font-medium mt-1 text-gray-900">{message}</span>
          </div>
        </div>
        <div className="flex space-x-2 items-end justify-end">
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{likesCount}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
