import { boot } from 'quasar/wrappers';
import { setCssVar } from 'quasar';

export default boot(() => {
  // Material-like rounded corners & subtle elevation feel
  setCssVar('border-radius', '12px');
  setCssVar('shadow-2', '0 1px 2px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.10)');
  setCssVar('shadow-3', '0 2px 6px rgba(0,0,0,.12), 0 3px 10px rgba(0,0,0,.10)');
});
