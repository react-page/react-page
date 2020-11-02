export const removeUndefinedProps = <T extends { [key: string]: unknown }>(
  obj: T
): T =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === 'undefined' || value == null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as T);
