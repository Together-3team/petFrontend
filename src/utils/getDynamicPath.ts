import { ParsedUrlQuery } from 'querystring';

export default function getDynamicPath(pathname: string, query: ParsedUrlQuery) {
  const dynamicPath = Object.keys(query).reduce((acc, key) => {
    const value = query[key];

    if (typeof value === 'string') {
      return acc.replace(`[${key}]`, value);
    }

    if (Array.isArray(value)) {
      return acc.replace(`[${key}]`, value[0]);
    }

    return acc;
  }, pathname);

  return dynamicPath;
}
