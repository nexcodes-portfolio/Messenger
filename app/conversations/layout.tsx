import getConversations from "../actions/getConversations";
import Sidebar from "../components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversation = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversation} />
        {children}
      </div>
    </Sidebar>
  );
}
