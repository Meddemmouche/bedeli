// app/messages/[userId]/page.tsx
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getConversationMessages, getConversationId, markMessagesAsRead } from '@/lib/messages';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import ChatInterface from './ChatInterface';

export default async function ChatPage({
  params
}: {
  params: Promise<{ userId: string }>
}) {
  const session = await auth();
  
  if (!session) {
    redirect('/connection');
  }

  const { userId: otherUserIdStr } = await params;
  const currentUserId = parseInt(session.user?.id || "");
  const otherUserId = parseInt(otherUserIdStr);

  // Get other user
  const [otherUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, otherUserId))
    .limit(1);

  if (!otherUser) {
    notFound();
  }

  // Get messages
  const messagesList = await getConversationMessages(currentUserId, otherUserId);

  // Mark as read
  const conversationId = getConversationId(currentUserId, otherUserId);
  await markMessagesAsRead(conversationId, currentUserId);

  return (
    <main className="h-screen flex flex-col bg-gray-50 w-full md:w-1/2 mx-100">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center gap-4">
        <Link href="/messages" className="text-gray-600 hover:text-gray-900">
          ←
        </Link>
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-100 rounded-full flex items-center justify-center text-white font-medium">
          {otherUser.f_name[0]}{otherUser.l_name[0]}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">
            {otherUser.f_name} {otherUser.l_name}
          </h2>
          <p className="text-sm text-gray-500">{otherUser.email}</p>
        </div>
      </div>

      {/* Chat Interface */}
        <ChatInterface
            currentUserId={currentUserId}
            otherUserId={otherUserId}
            initialMessages={messagesList}
        />
    </main>
  );
}