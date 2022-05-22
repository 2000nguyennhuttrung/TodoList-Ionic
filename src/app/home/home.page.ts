import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  taskName: any = '';
  
  taskList = [];
    
  constructor() {}

  loadData = async () => {
    let res = await fetch("http://localhost:8000/tasks/");
    let result = await res.json();

    console.log(result);
    
    result.forEach(item => {
      this.taskList.push({
        id: item.id,
        content: item.content
      })
    })
  }

  insertData = () => {
    fetch('http://localhost:8000/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(this.taskName)
    })
  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
      this.taskName = '';

      fetch('http://localhost:8000/tasks/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            content: task,
          }),
        }
      )
      window.location.reload();
    }
  }

  deleteTask(id) {
    fetch(`http://localhost:8000/tasks/${id}`, {
          method: 'DELETE'
        }
      )
    window.location.reload();
  }
}
