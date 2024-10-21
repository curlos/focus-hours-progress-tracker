export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const response = await fetch("http://localhost:8888/ticktick-1.0/focus-records");
  return response.json()
};
