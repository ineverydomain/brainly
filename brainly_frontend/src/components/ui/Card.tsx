import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="border-gray-300  bg-white shadow-md  rounded-xl max-w-120 max-h-120 min-w-80 min-h-90  border m-3">
        <div className="flex p-4 justify-between ">
          <div className="flex items-center gap-1 text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon size="md" />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
            <div className="pr-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>
        <div className="pt-2">
          {type === "youtube" && (
            <iframe
              className="w-full p-2"
              src={link
                .replace("watch", "embed")
                .replace("?v=", "/")
                .replace("&feature=youtu.be", "")} //https://www.youtube.com/embed/3mRCzRLCBzk?si=9XDCNo94JwgfrRpo
              //https://www.youtube.com/watch?v=3mRCzRLCBzk&feature=youtu.be
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x", "twitter")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
