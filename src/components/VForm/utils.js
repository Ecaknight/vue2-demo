export function setFormModel(schema = [], level = 0) {
  const obj = {};
  let i = 0;
  schema.forEach((item) => {
    if (!item.prop) {
      item.prop = `form${level}-${i}`;
    }
    if (item.schema && item.schema.length) {
      obj[item.prop] = setFormModel(item.schema, level + 1);
      i++;
    } else {
      obj[item.prop] = item.value;
    }
  });

  return obj;
}

export function setRules(schema = []) {
  const rules = {};
  schema.forEach((item) => {
    if (item.prop && item.rules) {
      rules[item.prop] = item.rules;
    }
    if (item.schema && item.schema.length) {
      // rules = { ...rules, ...setRules(item.schema) };
      item.schema.forEach((sub) => {
        rules[item.prop] = {
          ...rules[item.prop],
          [sub.prop]: sub.rules,
        };
      });
    }
  });
  return rules;
}
