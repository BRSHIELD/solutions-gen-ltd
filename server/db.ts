import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, certificates, InsertCertificate, contactSubmissions, InsertContactSubmission } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Certificate queries
export async function getAllCertificates() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get certificates: database not available");
    return [];
  }

  try {
    const result = await db.select().from(certificates).where(eq(certificates.isActive, 1)).orderBy(desc(certificates.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get certificates:", error);
    return [];
  }
}

export async function getCertificatesByCategory(category: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get certificates: database not available");
    return [];
  }

  try {
    const result = await db.select().from(certificates).where(eq(certificates.category, category)).orderBy(desc(certificates.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get certificates by category:", error);
    return [];
  }
}

export async function createCertificate(cert: InsertCertificate) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create certificate: database not available");
    return null;
  }

  try {
    const result = await db.insert(certificates).values(cert);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create certificate:", error);
    throw error;
  }
}

export async function deleteCertificate(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete certificate: database not available");
    return false;
  }

  try {
    await db.delete(certificates).where(eq(certificates.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete certificate:", error);
    throw error;
  }
}

// Contact submission queries
export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create contact submission: database not available");
    return null;
  }

  try {
    const result = await db.insert(contactSubmissions).values(submission);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create contact submission:", error);
    throw error;
  }
}

export async function getContactSubmissions() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact submissions: database not available");
    return [];
  }

  try {
    const result = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get contact submissions:", error);
    return [];
  }
}

export async function updateContactSubmissionStatus(id: number, status: "new" | "read" | "responded") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update contact submission: database not available");
    return false;
  }

  try {
    await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update contact submission:", error);
    throw error;
  }
}
