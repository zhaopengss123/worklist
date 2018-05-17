import Vue from 'vue'
import Router from 'vue-router'

/**
 * @define Components
 * -----------------------------------------------
 */
import LoginComponent from "@views/login";
import HomeComponent from '@views/home';
import WelcomeComponent from '@views/welcome';
import ListComponent from '@views/demo/list';
import DetailsComponent from '@views/demo/details';
import WeeklyComponent from '@views/weekly/weekly';
import NeedComponent from '@views/need/need';
import TaskListComponent from '@views/task/task-list';
import NewTaskEditComponent from '@views/task/task-edit';
import TaskDetaisComponent from '@views/task/task-details';
import EditorComponent from '@views/project/editor';
import CompleteWorkComponent from '@views/task/complete-work';
import ReceiveWorkComponent from '@views/receive/receive-list';
import LaunchWorkComponent from '@views/launch/launch-list';
import BuildComponent from '@views/build/build-detail';
import BuildEditComponent from '@views/build/build-edit';
import SettingsComponent from '@views/task/task-setting';
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home/welcome'
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginComponent
        },
        {
            path: '/home',
            name: 'Home',
            redirect: '/home/welcome',
            component: HomeComponent,
            children: [{
                    path: 'welcome',
                    name: 'Welcome',
                    component: WelcomeComponent
                },
                {
                    path: 'list',
                    name: 'LiseDemo',
                    component: ListComponent
                },
                {
                    path: 'details/:id',
                    name: 'DetailsDemo',
                    component: DetailsComponent
                },
                {
                    path: 'weekly',
                    name: 'Weekly',
                    component: WeeklyComponent
                },
                {
                    path: 'need',
                    name: 'Need',
                    component: NeedComponent
                },
                {
                    path: 'editor',
                    name: 'editor',
                    component: EditorComponent
                },
                {
                    path: 'tasklist/',
                    name: 'TaksList',
                    component: TaskListComponent
                },
                //新建任务和编辑任务，id为0新增
                {
                    // path: 'newtaskedit/:id',
                    path: 'newtaskedit/:id',
                    name: 'NewTaskEdit',
                    component: NewTaskEditComponent
                },
                //任务详情和任务详情发起人
                {
                    path: 'taskdetais/:id',
                    name: 'TaskDetais',
                    component: TaskDetaisComponent
                },
                
                //设置工单配置
                {
                    path: 'Settings',
                    name: 'Settings',
                    component: SettingsComponent
                },

                //完成的工单
                {
                    path: 'completeWork',
                    name: 'CompleteWork',
                    component: CompleteWorkComponent
                },
                //发起的工单
                {
                    path: 'launchWork/:id',
                    name: 'LaunchWork',
                    component: LaunchWorkComponent,
                },
                //接收的工单
                {
                    path: 'receiveWork/:id',
                    name: 'ReceiveWork',
                    component: ReceiveWorkComponent,
                },
                //筹建工单详情  BuildComponent
                {
                    path: 'buildDetail/:id',
                    name: 'BuildDetail',
                    component: BuildComponent,
                },
                //筹建工单编辑
                {
                    path: 'buildEdit/:id',
                    name: 'BuildEdit',
                    component: BuildEditComponent,
                },
            ]
        }
    ]
})