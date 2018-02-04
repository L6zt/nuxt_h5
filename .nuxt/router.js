import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _838a241c = () => import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */).then(m => m.default || m)
const _0a542e18 = () => import('..\\pages\\shop.vue' /* webpackChunkName: "pages_shop" */).then(m => m.default || m)
const _3126310e = () => import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages_shop_index" */).then(m => m.default || m)
const _340d2aaa = () => import('..\\pages\\shop\\fire.vue' /* webpackChunkName: "pages_shop_fire" */).then(m => m.default || m)
const _c9a0764c = () => import('..\\pages\\test\\_id.vue' /* webpackChunkName: "pages_test__id" */).then(m => m.default || m)
const _a06bae78 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/test",
			component: _838a241c,
			name: "test"
		},
		{
			path: "/shop",
			component: _0a542e18,
			children: [
				{
					path: "",
					component: _3126310e,
					name: "shop"
				},
				{
					path: "fire",
					component: _340d2aaa,
					name: "shop-fire"
				}
			]
		},
		{
			path: "/test/:id",
			component: _c9a0764c,
			name: "test-id"
		},
		{
			path: "/",
			component: _a06bae78,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
