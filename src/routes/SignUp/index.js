import { injectReducer } from '../../store/reducers';
import container from './containers/SignUpContainer';
import reducer from './modules/signUp';

export default store => ({
  path: 'signUp',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'counter', reducer });

    /*  Return getComponent   */
    cb(null, container);
  },
});
