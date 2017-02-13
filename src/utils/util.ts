/** @private */
export function isTrueProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
};

/** @private */
export function isPresent(val: any): boolean {
  return val !== undefined && val !== null;
}

/** @private */
const ASSERT_ENABLED = true;

/** @private */
export function assert(actual: any, reason?: string) {
  if (!actual && ASSERT_ENABLED === true) {
    let message = 'IONIC ASSERT: ' + reason;
    console.error(message);
    debugger; // tslint:disable-line
    throw new Error(message);
  }
}