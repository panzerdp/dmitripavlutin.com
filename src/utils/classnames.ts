/**
 * The classNames function takes any number of arguments which can be a string, array or object.
 * If the value associated with a given key is falsy, that key won't be included in the output.
 *
 * Example:
 * classNames('ui_spinner', ['c1', 'c2', c3], { hidden: this.props.shouldHide })
 * Would return 'ui_spinner c1 c2 c3 hidden' if this.props.shouldHide is true
 * Would return 'ui_spinner c1 c2 c3' if this.props.shouldHide is false
 */

// eslint-disable-next-line
export default function classNames(...args: Array<any>) {
  const classes = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      const argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames(...arg));
      } else if (argType === 'object') {
        Object.keys(arg)
          .filter(key => arg[key])
          .forEach(key => classes.push(key));
      }
    }
  }
  return classes.join(' ');
}
