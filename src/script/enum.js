/**
 * @description -
 * @param {String} name -enum的名称
 * @param {Array} enums -原始字典
 * @param {Object} opts
 * @param {Function} opts.labelFunc -原始字典中提出所需要的label
 * @param {Function} opts.valueFunc -原始字典中提出所需要的value
 * @returns {Object}
 */
function getEnumManager(name, enums, opts = {}) {
  const {
    labelFunc = (item) => {
      return item?.label;
    },
    valueFunc = (item) => {
      return item?.value;
    },
  } = opts;

  const labels = enums.map(labelFunc);
  const values = enums.map(valueFunc);
  const dic = enums.map((item) => {
    return {
      label: labelFunc(item),
      value: valueFunc(item),
    };
  });
  return {
    name,
    labels,
    values,
    enums,
    dic,
    getValueByLabel(label) {
      return values[labels.indexOf(label)];
    },
    getLabelByValue(value) {
      return labels[values.indexOf(value)];
    },
    getOriginItemByValueOrLabel(valueOrLabel) {
      let index = values.indexOf(valueOrLabel);
      if (index < 0) {
        index = labels.indexOf(valueOrLabel);
      }
      return enums[index];
    },
    getFormatItemByValueOrLabel(valueOrLabel) {
      let index = values.indexOf(valueOrLabel);
      if (index < 0) {
        index = labels.indexOf(valueOrLabel);
      }
      return dic[index];
    },
    // 其他专用取值函数
  };
}
