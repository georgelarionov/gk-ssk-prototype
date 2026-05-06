import { notFound, redirect } from "next/navigation";
import { getChatsBySessionId } from "@/lib/db/sessions";
import { getSessionByIdCached } from "@/lib/db/sessions-cache";
import { getServerSession } from "@/lib/session/get-server-session";

interface PlatformSessionPageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function PlatformSessionPage({
  params,
}: PlatformSessionPageProps) {
  const { sessionId } = await params;

  const sessionPromise = getServerSession();
  const sessionRecordPromise = getSessionByIdCached(sessionId);

  const session = await sessionPromise;
  if (!session?.user) {
    redirect("/");
  }

  const sessionRecord = await sessionRecordPromise;
  if (!sessionRecord) {
    notFound();
  }

  if (sessionRecord.userId !== session.user.id) {
    redirect("/");
  }

  const chats = await getChatsBySessionId(sessionId);
  const targetChat = chats[0];

  if (!targetChat) {
    notFound();
  }

  redirect(`/platform/${sessionId}/chats/${targetChat.id}`);
}
