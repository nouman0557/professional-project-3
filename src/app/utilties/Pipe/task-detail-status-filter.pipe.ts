import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDetailStatusFilter'
})
export class TaskDetailStatusFilterPipe implements PipeTransform {

  transform(taskList: Array<any>, filter: Array<any>): Array<any> {
    if (taskList && filter.length > 0) {
      return taskList.filter((service) => {
        for (let status of filter) {
          if (service.service_status.status_name === status) {
            return true
          }
        }
      })
    } else {
      return taskList
    }
  }
}
