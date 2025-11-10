export async function retry<T>(fn: () => Promise<T>, retries = 3, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await fn();
      if (result instanceof Response && result.status == 500) {
        throw new Error(
          `Failed to fetch: ${result.status} ${result.statusText}`
        );
      }

      return result;
    } catch (error) {
      //logger
      console.log(`Attempt ${i + 1} Failed:`, error);

      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }
  throw new Error("Retries Exceeded");
}
