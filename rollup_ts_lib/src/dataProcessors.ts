export const initProcessor = {
  receive([data, socket]: [string, any]): [string, any] {
    return [data, socket];
  },
  send([component, socket]: [object, any]): [object, any] {
    return [component, socket];
  },
};
