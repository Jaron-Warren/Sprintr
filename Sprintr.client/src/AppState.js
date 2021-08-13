import { reactive } from 'vue'
const task1 = {
  name: 'Task one',
  weight: 50,
  status: 'pending',
  projectId: 'abc',
  backlogItemId: '123',
  sprintId: '61155998cb688edf5d488dc8'

}
// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [],
  activeProject: {},
  sprints: [],
  tasks: [],
  backlogItems: []

})
