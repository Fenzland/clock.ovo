import Router from '../OvO/routing/Router.js';
import { resolveHere, } from '../OvO/support/path.js';

const router= new Router();

router.pageDir= resolveHere( '../pages', );
router.basePath= resolveHere( '..', );

router.route( 'home', '/', 'clock', );

export default router;
