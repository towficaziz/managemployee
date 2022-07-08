import { EmployeeManage } from './../models/employee-manage.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {
  @Input() employeer: EmployeeManage;
  @Output() onRemoveEmployee= new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  constructor() { 
    this.employeer={
      firstname:'',
      lastname:'',
      birthdate:'',
      gender:'',
      education:'',
      company:'',
      jobExperience:0,
      salary: 0,
      profile:'',

    };
  }

  ngOnInit(): void {
    // console.log(this.employeer)
  }

  deleteEmployeeClicked(){
    this.onRemoveEmployee.emit(this.employeer.id);
  }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employeer.id);
  }

}
