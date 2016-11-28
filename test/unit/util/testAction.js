/**
 * Test the call of an action; mocks the arguments, state, getters, dispatches and commits
 * @param {Function} action
 * @param {Object} [options]
 * @param {Array} [options.args]
 * @param {Object} [options.state]
 * @param {Object} [options.rootState]
 * @param {Object} [options.getters]
 * @param {Object[]} [options.commits]
 * @param {String} options.commits.name
 * @param {Array} [options.commits.payload]
 * @param {Object[]} [options.dispatches]
 * @param {String} options.dispatches.name
 * @param {Array} [options.dispatches.payload]
 * @param {Function} [done]
 * @returns {*} Return value of the action call
 */
export default async function testAction(
  action,
  { args = [], state = {}, rootState = {}, getters = {}, commits = [], dispatches = [] } = {},
) {
  const mockStore = {
    dispatch() {},
    commit() {},
    state,
    rootState,
    getters,
  };
  spyOn(mockStore, 'dispatch');
  spyOn(mockStore, 'commit');
  try {
    return await action(mockStore, ...args);
  } catch (error) {
    throw error;
  } finally {
    // Check individual commits
    commits.forEach(commit => {
      expect(mockStore.commit).toHaveBeenCalledWith(commit.name, ...(commit.payload || []));
    });

    // Check individual dispatches
    dispatches.forEach(dispatch => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(dispatch.name, ...(dispatch.payload || []));
    });

    // Check that the total commits are correct
    if (commits.length) {
      expect(mockStore.commit).toHaveBeenCalledTimes(commits.length);
    } else {
      expect(mockStore.commit).not.toHaveBeenCalled();
    }

    // Check that the total dispatches are correct
    if (dispatches.length) {
      expect(mockStore.dispatch).toHaveBeenCalledTimes(dispatches.length);
    } else {
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    }
  }
}
