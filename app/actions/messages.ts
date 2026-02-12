// app/actions/messages.ts
'use server'

import { auth } from '@/lib/auth';
import { sendMessage, markMessagesAsRead } from '@/lib/messages';
import { revalidatePath } from 'next/cache';

export async function sendMessageAction(
  receiverId: number,
  content: string
) {
  const session = await auth();
  
  if (!session) {
    throw new Error('Not authenticated');
  }

  const trimmedContent = content.trim();
  
  if (!trimmedContent) {
    return { error: 'Message cannot be empty' };
  }

  if (trimmedContent.length > 1000) {
    return { error: 'Message too long (max 1000 characters)' };
  }

    try {
        await sendMessage(
        parseInt(session.user?.id || ""),
        receiverId,
        trimmedContent
        );
        
        revalidatePath('/messages');
        return { success: true };
    } catch (error) {
        console.error('Error sending message:', error);
        return { error: 'Failed to send message' };
    }
}

export async function markAsReadAction(conversationId: string) {
  const session = await auth();
  
  if (!session ) {
    throw new Error('Not authenticated');
  }

  try {
    await markMessagesAsRead(conversationId, parseInt(session.user?.id || ""));
    revalidatePath('/messages');
  } catch (error) {
    console.error('Error marking as read:', error);
  }
}