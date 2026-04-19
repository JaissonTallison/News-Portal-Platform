type RateLimitOptions = {
  windowMs: number;
  max: number;
};

const store = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(options: RateLimitOptions) {
  return (key: string) => {
    const now = Date.now();

    const entry = store.get(key);

    if (!entry || entry.expiresAt < now) {
      store.set(key, {
        count: 1,
        expiresAt: now + options.windowMs,
      });
      return { success: true };
    }

    if (entry.count >= options.max) {
      return { success: false };
    }

    entry.count++;
    return { success: true };
  };
}