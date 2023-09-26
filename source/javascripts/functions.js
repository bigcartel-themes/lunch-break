
function camelCaseToDash(string) {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const isGreaterThanZero = (currentValue) => currentValue > 0;

function arrayContainsArray(superset, subset) {
  if (subset.length === 0) {
    return false;
  }
  const supersetSet = new Set(superset);
  return subset.every((value) => supersetSet.has(value));
}

function unique(item, index, array) {
  return array.indexOf(item) === index;
}

function cartesianProduct(arrays) {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];

  const [first, ...rest] = arrays;
  const result = [];

  const recursiveProduct = (current, remaining) => {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    const [head, ...tail] = remaining;
    for (const item of head) {
      recursiveProduct([...current, item], tail);
    }
  };

  recursiveProduct([], arrays);
  return result;
}

Array.prototype.equals = function (array) {
  if (!array) return false;
  if (this.length !== array.length) return false;
  return this.every((value, index) => {
    if (Array.isArray(value) && Array.isArray(array[index])) {
      return value.equals(array[index]);
    }
    return value === array[index];
  });
};

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      const o = Object(this);
      const len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      const n = fromIndex | 0;
      const k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (o[k] === searchElement || (isNaN(o[k]) && isNaN(searchElement))) {
          return true;
        }
        k++;
      }
      return false;
    },
  });
}

Array.prototype.count = function (filterMethod) {
  return this.filter(filterMethod).length;
};
