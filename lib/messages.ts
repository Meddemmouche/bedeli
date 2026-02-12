// lib/messages.ts
import { db } from '@/lib/db';
import { messages, conversations, users } from './schema';
import { eq, and, or, desc } from 'drizzle-orm';

// Generate conversation ID (always sorted so user1_user2 === user2_user1)
export function getConversationId(userId1: number, userId2: number): string {
  const sorted = [userId1, userId2].sort((a, b) => a - b);
  return `${sorted[0]}_${sorted[1]}`;
}

// Get all conversations for a user
export async function getUserConversations(userId: number) {
  const userConversations = await db
    .select()
    .from(conversations)
    .where(
      or(
        eq(conversations.user1Id, userId),
        eq(conversations.user2Id, userId)
      )
    )
    .orderBy(desc(conversations.lastMessageAt));

  // Get other user details for each conversation
  const conversationsWithUsers = await Promise.all(
    userConversations.map(async (conv) => {
      const otherUserId = conv.user1Id === userId ? conv.user2Id : conv.user1Id;
      const [otherUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, otherUserId))
        .limit(1);

      // Count unread messages
      const unreadCount = await db
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.conversationId, conv.id),
            eq(messages.receiverId, userId),
            eq(messages.read, false)
          )
        );

      return {
        ...conv,
        otherUser,
        unreadCount: unreadCount.length,
      };
    })
  );

  return conversationsWithUsers;
}

// Get messages between two users
export async function getConversationMessages(userId1: number, userId2: number) {
  const conversationId = getConversationId(userId1, userId2);
  
  return await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt);
}

// Send a message
export async function sendMessage(
  senderId: number,
  receiverId: number,
  content: string
) {
  const conversationId = getConversationId(senderId, receiverId);
  const now = new Date().toISOString();

  // Create or update conversation
  const [existingConv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .limit(1);

  if (!existingConv) {
    const sorted = [senderId, receiverId].sort((a, b) => a - b);
    await db.insert(conversations).values({
      id: conversationId,
      user1Id: sorted[0],
      user2Id: sorted[1],
      lastMessageAt: now,
      lastMessage: content.substring(0, 100),
      createdAt: now,
    });
  } else {
    await db
      .update(conversations)
      .set({
        lastMessageAt: now,
        lastMessage: content.substring(0, 100),
      })
      .where(eq(conversations.id, conversationId));
  }

  // Insert message
  const [message] = await db
    .insert(messages)
    .values({
      conversationId,
      senderId,
      receiverId,
      content,
      read: false,
      createdAt: now,
    })
    .returning();

  return message;
}

// Mark messages as read
export async function markMessagesAsRead(conversationId: string, userId: number) {
  await db
    .update(messages)
    .set({ read: true })
    .where(
      and(
        eq(messages.conversationId, conversationId),
        eq(messages.receiverId, userId),
        eq(messages.read, false)
      )
    );
}