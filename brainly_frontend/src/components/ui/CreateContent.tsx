// controlled component

import { useRef, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../pages/config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
};

export function CreateContent({ open, onClose }: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addcontent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    onClose();
  }
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black/50 fixed top-0 left-0  flex justify-center">
          <div className="flex flex-col justify-center ">
            <span className="bg-white p-4 rounded-md min-h-120 min-w-100 ">
              <div
                className="flex justify-end cursor-pointer"
                onClick={onClose}
              >
                <CloseIcon />
              </div>
              <div>
                <div className=" flex justify-center">
                  <Input reference={titleRef} placeholder={"Title"} />
                </div>
                <div className=" flex justify-center">
                  <Input reference={linkRef} placeholder={"Link"} />
                </div>
                <div className="flex justify-center">
                  <Button
                    text="Youtube"
                    size="md"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                  ></Button>
                  <Button
                    text="Twitter"
                    size="md"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  ></Button>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addcontent}
                    variant="primary"
                    size="lg"
                    text="Submit"
                  ></Button>
                </div>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
