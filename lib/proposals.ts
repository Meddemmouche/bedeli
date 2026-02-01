import { db } from '@/lib/db';
import { products, proposals, users } from '@/lib/schema';
import { eq, and, or } from 'drizzle-orm';

export async function canUserProposeTrade(userId: number, productId: number) {
  // Check if product exists and is active
  const [product] = await db
    .select()
    .from(products)
    .where(and(
      eq(products.id, productId),
      eq(products.status, 'active')
    ))
    .limit(1);
    
  if (!product) {
    return { canPropose: false, reason: 'Product not found or unavailable' };
  }
  
  // User cannot trade with themselves
  if (product.u_id === userId) {
    return { canPropose: false, reason: 'Cannot trade your own item' };
  }
  
  // Check if user has active products
  const userProducts = await db
    .select()
    .from(products)
    .where(and(
      eq(products.u_id, userId),
      eq(products.status, 'active')
    ));
    
  if (userProducts.length === 0) {
    return { canPropose: false, reason: 'You need to post an item first' };
  }
  
  return { canPropose: true, userProducts };
}

export async function createProposalInDb(data: {
  fromUserId: number;
  toUserId: number;
  fromProductId: number;
  toProductId: number;
  message?: string;
}) {
  const now = new Date().toISOString();
  
  const [proposal] = await db
    .insert(proposals)
    .values({
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
      fromProductId: data.fromProductId,
      toProductId: data.toProductId,
      message: data.message || null,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return proposal;
}

export async function getUserProposals(userId: number) {
  // Get proposals where user is sender or receiver
  const userProposals = await db
    .select({
      proposal: proposals,
      fromProduct: products,
      toProduct: products,
      fromUser: users,
      toUser: users,
    })
    .from(proposals)
    .leftJoin(
      products, 
      eq(proposals.fromProductId, products.id)
    )
    // This needs a second alias - we'll simplify below
    .where(
      or(
        eq(proposals.fromUserId, userId),
        eq(proposals.toUserId, userId)
      )
    );

  return userProposals;
}

// Simpler version - get proposals with basic info
export async function getProposalsByUser(userId: number) {
  return await db
    .select()
    .from(proposals)
    .where(
      or(
        eq(proposals.fromUserId, userId),
        eq(proposals.toUserId, userId)
      )
    );
}

export async function getProposalById(proposalId: number) {
  const [proposal] = await db
    .select()
    .from(proposals)
    .where(eq(proposals.id, proposalId))
    .limit(1);

  return proposal;
}

export async function updateProposalStatus(
  proposalId: number,
  status: 'accepted' | 'rejected' | 'completed' | 'cancelled'
) {
  const [updated] = await db
    .update(proposals)
    .set({ 
      status,
      updatedAt: new Date().toISOString()
    })
    .where(eq(proposals.id, proposalId))
    .returning();

  // If accepted, mark products as traded
  if (status === 'accepted') {
    const proposal = await getProposalById(proposalId);
    if (proposal) {
      await db
        .update(products)
        .set({ status: 'traded' })
        .where(
          or(
            eq(products.id, proposal.fromProductId),
            eq(products.id, proposal.toProductId)
          )
        );
    }
  }

  return updated;
}