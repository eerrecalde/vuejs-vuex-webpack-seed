/**
 * Assert a count of given selector
 * @param {String} selector
 * @param {Number} count
 * @returns {Void} No return value
 */
export function assertion(selector, count) {
  this.message = `Testing if element <${selector}> has count: ${count}`;
  this.expected = count;
  this.pass = val => val === this.expected;
  this.value = res => res.value;
  this.command = cb => this.api.execute(
    _selector => document.querySelectorAll(_selector).length,
    [selector],
    res => cb.call(this, res),
  );
}
