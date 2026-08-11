const MONO_SYNC_KEY = "bank360:mono-transaction-sync";
export const MONO_SYNC_TIMEOUT_MS = 10 * 60 * 1000;

interface PendingMonoSync {
  accountId: string;
  startedAt: number;
}

export const markMonoSyncPending = (accountId?: string) => {
  if (!accountId) return;

  localStorage.setItem(
    MONO_SYNC_KEY,
    JSON.stringify({ accountId, startedAt: Date.now() })
  );
};

export const getPendingMonoSync = (): PendingMonoSync | null => {
  const storedSync = localStorage.getItem(MONO_SYNC_KEY);
  if (!storedSync) return null;

  try {
    const pendingSync = JSON.parse(storedSync) as PendingMonoSync;
    if (
      !pendingSync.accountId ||
      !pendingSync.startedAt ||
      Date.now() - pendingSync.startedAt > MONO_SYNC_TIMEOUT_MS
    ) {
      localStorage.removeItem(MONO_SYNC_KEY);
      return null;
    }
    return pendingSync;
  } catch {
    localStorage.removeItem(MONO_SYNC_KEY);
    return null;
  }
};

export const clearPendingMonoSync = () => {
  localStorage.removeItem(MONO_SYNC_KEY);
};
