/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Serializes Prisma objects to make them safe for passing from Server Components to Client Components
 * Handles Decimal, Date, and other non-serializable types
 */
export function serializePrismaObject<T>(obj: T): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
  
    if (obj instanceof Date) {
      return obj.toISOString();
    }
  
    // Handle Decimal objects (from Prisma)
    if (typeof obj === 'object' && obj !== null && 'toNumber' in obj && typeof obj.toNumber === 'function') {
      return obj.toNumber();
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => serializePrismaObject(item));
    }
  
    if (typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, serializePrismaObject(value)])
      );
    }
  
    return obj;
  }
  