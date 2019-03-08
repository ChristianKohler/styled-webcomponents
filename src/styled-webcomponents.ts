import { extractDestructuredParams } from "./params";
import { h } from "preact";
import { define } from "./define";

export function style(styleAsString: string, addHost: boolean = false) {
  return h(
    "style",
    null,
    addHost ? `:host { ${styleAsString} }` : styleAsString
  );
}

export function styledComponent(tag: string, fn: Function) {
  const params = extractDestructuredParams(fn.toString());
  const styles = (params: any) => style(fn(params));
  return define({
    tag,
    params
  }, (params: any) => {
    return [styles(params), h("slot", null)];
  });
}

function isFunction(obj: any) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

const styledFn = (template: TemplateStringsArray, ...substitutions: any[]) => {
  return (props: any) => {
    const parsedSubstitutions = substitutions.map(substitution => {
      return isFunction(substitution) ? substitution(props) : substitution;
    });
    return [
      style(String.raw(template, ...parsedSubstitutions), true),
      h("slot", null)
    ];
  };
};

export const styled = {
  h1: styledFn,
  section: styledFn
};
