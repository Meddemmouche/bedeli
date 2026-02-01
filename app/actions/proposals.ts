// app/actions/proposals.ts
'use server'

import { auth } from '@/lib/auth';
import { createProposalInDb, updateProposalStatus } from '@/lib/proposals';
import { redirect } from 'next/navigation';

export async function createProposal(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const session = await auth();
  
  if (!session || !session.user) {
    return { error: 'You must be logged in' };
  }

  const fromProductId = parseInt(formData.get('fromProductId') as string);
  const toProductId = parseInt(formData.get('toProductId') as string);
  const toUserId = parseInt(formData.get('toUserId') as string);
  const message = formData.get('message') as string;

  if (!fromProductId || !toProductId || !toUserId) {
    return { error: 'Missing required fields' };
  }

  try {
    const proposal = await createProposalInDb({
      fromUserId: parseInt(session.user.id || '0'),
      toUserId,
      fromProductId,
      toProductId,
      message: message || undefined,
    });

    console.log('✅ Proposal created:', proposal.id);
  } catch (error) {
    console.error('❌ Error creating proposal:', error);
    return { error: 'Failed to create proposal' };
  }

  redirect('/proposals');
}

export async function acceptProposal(proposalId: number) {
  const session = await auth();
  
  if (!session) {
    throw new Error('Not authenticated');
  }

  try {
    await updateProposalStatus(proposalId, 'accepted');
    console.log('✅ Proposal accepted:', proposalId);
  } catch (error) {
    console.error('❌ Error accepting proposal:', error);
    throw error;
  }

  redirect(`/proposal/${proposalId}`);
}

export async function rejectProposal(proposalId: number) {
  const session = await auth();
  
  if (!session) {
    throw new Error('Not authenticated');
  }

  try {
    await updateProposalStatus(proposalId, 'rejected');
    console.log('✅ Proposal rejected:', proposalId);
  } catch (error) {
    console.error('❌ Error rejecting proposal:', error);
    throw error;
  }

  redirect('/proposals');
}