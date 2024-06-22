export default function getFirstQueryParam(query: string | string[] | undefined) {
  if (Array.isArray(query)) {
    return query[0];
  }

  return query;
}
