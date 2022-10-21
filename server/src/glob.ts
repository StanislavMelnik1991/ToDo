export function parseUrl(url: string): { command: string, params: Record<string, string | true> } {
  const args = url.split('?');
  const command = args[0];
  const params: Record<string, string | true> = {};
  if (args[1]) {
    args[1].split('&').forEach((item) => {
      const it = item.split('=');
      if (it[0] === '') {
        return;
      }
      // eslint-disable-next-line prefer-destructuring
      params[it[0]] = it[1] || true;
    });
  }
  return { command, params };
}
