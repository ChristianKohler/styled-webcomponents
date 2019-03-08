const bracesRegex = /(\(|\))/g;

export function extractDestructuredParams(fnAsString: string) {
  const fnParams = extractFnParams(fnAsString);
  if (fnParams.length === 1) {
    const pattern = new RegExp(`${fnParams[0]}\\.(\\w+)`, "gm");
    const paramMatches = fnAsString.match(pattern);
    return paramMatches
      ? paramMatches.map(p => p.replace(`${fnParams[0]}.`, ""))
      : [];
  } else {
    return [];
  }
}

export function extractFnParams(fnAsString: string) {
  const isArrowFunction = fnAsString.indexOf("function") !== 0;
  const paramPart = (isArrowFunction
    ? getParamPartFromArrowFn(fnAsString)
    : getParamFromFn(fnAsString)
  ).trim();

  return paramPart
    .split(",")
    .filter(x => x !== "")
    .map(x => x.trim());
}

function getParamPartFromArrowFn(fnString: string) {
  return fnString.split("=>")[0].replace(bracesRegex, "");
}

function getParamFromFn(fnString: string) {
  return fnString.split(bracesRegex)[2];
}
