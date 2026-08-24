import { useEffect, useState } from "react";
import "../App.css";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContent } from "../components/ui/CreateContent";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { useContents } from "../hooks/useContents";

export function Dashboard() {
  const [contents, refresh] = useContents();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    refresh;
  }, [modalOpen]);

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-50 min-h-screen bg-gray-100 ">
        <CreateContent
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="justify-end flex">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            startIcon={<PlusIcon size="md" />}
            variant="primary"
            size="md"
            text="Add Content"
          />
          <Button
            startIcon={<ShareIcon size="sm" />}
            variant="secondary"
            size="md"
            text="Share Brain"
          />
        </div>

        <div className="flex flex-wrap">
          {
            //@ts-ignore
            contents.map(({ _id, type, link, title }) => (
              <Card key={_id} title={title} type={type} link={link}></Card>
            ))
          }

          {/* <Card
            title="First Tweet"
            link="https://x.com/MUTGuru/status/2082971885160046661?s=20" //
            type="twitter"
          ></Card> */}
        </div>
      </div>
    </div>
  );
}
