// app/messages/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserConversations } from '@/lib/messages';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default async function MessagesPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/connection');
  }

  const userId = parseInt(session.user?.id || "");
  const conversations = await getUserConversations(userId);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-600 mb-6">
              Start a conversation by messaging someone from their product page
            </p>
            <Link
              href="/"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors"
            >
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {conversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/messages/${conv.otherUser.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-200 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                    {conv.otherUser.f_name[0]}{conv.otherUser.l_name[0]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {conv.otherUser.f_name} {conv.otherUser.l_name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(conv.lastMessageAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {conv.unreadCount > 0 && (
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}