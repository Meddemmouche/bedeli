import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function createUser(data: {
  f_name: string;
  l_name: string;
  email: string;
  age: number;
  password: string;
  gender: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      f_name: data.f_name,
      l_name: data.l_name,
      email: data.email,
      age: data.age,
      password: hashedPassword,
      gender: data.gender,
      city: data.city ?? null,
      state: data.state ?? null,
      country: data.country ?? 'DZ',
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
    })
    .returning();

  return newUser;
}

// Get user by email
export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Get user by ID
export async function getUserById(id: number) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function verifyUser(email: string, password: string) {
  console.log('Verifying user:', email);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  console.log('User found in DB:', !!user);

  if (!user) {
    console.log('No user found with email:', email);
    return null;
  }

  console.log('Comparing passwords...');
  console.log('Stored hash exists:', !!user.password);
  console.log('Provided password exists:', !!password);

  const isValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isValid);

  if (!isValid) {
    console.log('Invalid password');
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
