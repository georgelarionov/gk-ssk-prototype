import { redirect } from "next/navigation";
import { getChatsBySessionId, getSessionsByUserId } from "@/lib/db/sessions";
import { getServerSession } from "@/lib/session/get-server-session";

export default async function PlatformPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/");
  }

  const userSessions = await getSessionsByUserId(session.user.id);
  const firstActive = userSessions.find((s) => s.status !== "archived");
  if (!firstActive) {
    redirect("/");
  }

  const chats = await getChatsBySessionId(firstActive.id);
  const firstChat = chats[0];
  if (!firstChat) {
    redirect("/");
  }

  redirect(`/platform/${firstActive.id}/chats/${firstChat.id}`);
}
