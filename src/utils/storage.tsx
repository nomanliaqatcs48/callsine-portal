/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export const loadString = async (key: string): Promise<string | null> => {
  try {
    return await localStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
};

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export const saveString = async (
  key: string,
  value: string
): Promise<boolean> => {
  try {
    await localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export const load = async (key: string): Promise<any | null> => {
  try {
    const almostThere: any = await localStorage.getItem(key);
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
};

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export const save = async (key: string, value: any): Promise<boolean> => {
  try {
    await localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export const remove = async (key: string): Promise<void> => {
  try {
    await localStorage.removeItem(key);
  } catch {}
};

/**
 * Burn it all to the ground.
 */
export const clear = async (): Promise<void> => {
  try {
    await localStorage.clear();
  } catch {}
};
