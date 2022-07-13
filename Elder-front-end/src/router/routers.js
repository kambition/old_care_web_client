const BaseLayOut = () => import('@/components/layout/BaseLayout.vue');
export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            hideInMenu: true,
            title: '登录'
        },
        component: () => import('@/views/user/Login.vue')
    },
    {
		path: '/',
		name: 'main',
		component: BaseLayOut,
		meta: {
			index: '1',
			icon: 'ios-analytics',
			title: "系统设置"
		},
		children: [
			{
				path: '/system1',
				name: 'system1',
				component: () => import('@/views/setting/Register.vue'),
				meta: {
					index: '1-1',
					// hideInMenu: true,
					title: '添加管理员'
				}
			},
            {
                path: 'system2',
                name: 'system2',
                component: () => import('@/views/setting/Password.vue'),
                meta: {
                    index: '1-2',
                    // hideInMenu: true,
                    title: '更改密码'
                }
            }
		]
	},
    {
        path: '/elder',
        name: 'elder',
        component: BaseLayOut,
        meta: {
            index: '2',
            icon: 'md-sad',
            title: "老年人管理 "
        },
        children: [
            {
                path: 'elder1',
                name: 'e-list',
                component: () => import('@/components/List.vue'),
                meta: {
                    index: '2-1',
                    // hideInMenu: true,
                    title: "老年人列表",
                    // hideInBread: true
                },
                props: {type: 1},
            },
            {
                path: 'elder2',
                name: 'e-add',
                component: () => import('@/components/Add_1.vue'),
                meta: {
                    index: '2-2',
                    // hideInMenu: true,
                    title: "添加老年人",
                    // hideInBread: true
                }
            },
            {
                path: 'elder3',
                name: 'e-show',
                component: () => import('@/components/Statistic.vue'),
                // component: () => import('@/views/service/Types.vue'),
                meta: {
                    index: '2-3',
                    // hideInMenu: true,
                    title: "统计分析",
                    // hideInBread: true
                },
                props: {type: 1},
            }
        ]
    },
    {
        path: '/staff',
        name: 'staff',
        component: BaseLayOut,
        meta: {
            index: '3',
            icon: 'ios-settings',
            title: "工作人员管理"
        },
        children: [
            {
                path: 'staff1',
                name: "s-list",
                component: () => import('@/components/List.vue'),
                meta: {
                    index: '3-1',
                    title: "工作人员列表"
                },
                props: {type: 2},
            },
            {
                path: 'staff2',
                name: "s-add",
                component: () => import('@/components/Add_2.vue'),
                // component: () => import('@/views/setting/Password.vue'),
                meta: {
                    index: '3-2',
                    title: "添加工作人员  "
                }
            },
            {
                path: 'staff3',
                name: "s-show",
                component: () => import('@/components/Statistic.vue'),
                // component: () => import('@/views/setting/Password.vue'),
                meta: {
                    index: '3-3',
                    title: "统计分析"
                },
                props: {type: 2},
            }
        ]
    },
    {
        path: '/worker',
        name: 'worker',
        component: BaseLayOut,
        meta: {
            index: '4',
            icon: 'ios-settings',
            title: "义工管理"
        },
        children: [
            {
                path: 'worker1',
                name: "w-list",
                component: () => import('@/components/List.vue'),
                meta: {
                    index: '4-1',
                    title: "义工列表"
                },
                props: {type: 3},
            },
            {
                path: 'worker2',
                name: "w-add",
                component: () => import('@/components/Add_3.vue'),
                // component: () => import('@/views/setting/Password.vue'),
                meta: {
                    index: '4-2',
                    title: "添加义工"
                }
            },
            {
                path: 'worker3',
                name: "w-show",
                component: () => import('@/components/Statistic.vue'),
                // component: () => import('@/views/setting/Password.vue'),
                meta: {
                    index: '4-3',
                    title: "统计分析"
                },
                props: {type: 3},
            }
        ]
    },
    {
        path: '/data',
        name: 'data',
        redirect: '/data/dataFrame',
        component: BaseLayOut,
        meta: {
            index: '5',
            icon: 'ios-settings',
            title: "实时报表"
        },
        children: [
            {
                path: 'dataFrame',
                name: "dataFrame",
                component: () => import('@/views/service/Types.vue'),
                meta: {
                    index: '5-1',
                    hideInMenu: true,
                    hideInBread: true,
                    title: "实时报表"
                }
            }
        ]
    },
    {
        path: '/camera',
        name: 'camera',
        redirect: '/camera',
        component: BaseLayOut,
        meta: {
            index: '6',
            icon: 'ios-settings',
            title: "摄像头管理"
        },
        children: [
            {
                path: '/camera',
                name: "ca",
                component: () => import('@/components/Camera.vue'),
                meta: {
                    index: '6-1',
                    hideInMenu: true,
                    title: "摄像头"
                }
            }
        ]
    }
]