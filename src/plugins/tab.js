import store from '@/store'
import router from '@/router';

export default {
    // 刷新当前tab页签
    refreshPage(tag) {
        const { path, query, matched } = router.currentRoute;
        if (tag === undefined) {
            matched.forEach((m) => {
                if (m.components && m.components.default && m.components.default.name) {
                    if (!['Layout', 'ParentView'].includes(m.components.default.name)) {
                        tag = { name: m.components.default.name, path: path, query: query };
                    }
                }
            });
        }
        return store.dispatch('tagsView/delCachedView', tag).then(() => {
            const { path, query } = tag
            router.replace({
                path: '/redirect' + path,
                query: query
            })
        })
    },
    // 关闭指定tab页签
    closePage(obj) {
        if (obj === undefined) {
            return store.dispatch('tagsView/delView', router.currentRoute).then(({ lastPath }) => {
                return router.push(lastPath || '/');
            });
        }
        return store.dispatch('tagsView/delView', obj);
    },
    // 关闭其他tab页签
    closeOtherPage(obj) {
        return store.dispatch('tagsView/delOthersViews', obj || router.currentRoute);
    },
    // 关闭左侧tab页签
    closeLeftPage(obj) {
        return store.dispatch('tagsView/delLeftTags', obj || router.currentRoute);
    },
    // 关闭右侧tab页签
    closeRightPage(obj) {
        return store.dispatch('tagsView/delRightTags', obj || router.currentRoute);
    },
    // 关闭所有tab页签
    closeAllPage() {
        return store.dispatch('tagsView/delAllViews');
    },
}