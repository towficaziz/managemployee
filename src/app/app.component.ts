
import { EmployeeManageService } from './services/employee-manage.service';
import { EmployeeManage } from './models/employee-manage.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  title = 'employeeManage';

  employeeForm: FormGroup;

  employees: EmployeeManage[];
  employeesToDisplay: EmployeeManage[];
  educationOptions=[
    'SSC Pass',
    'HSC Pass',
    'graduate',
    'post graduate',
    'phd'
  ];

  constructor(private fb: FormBuilder, private employeeManageService: EmployeeManageService){
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  ngOnInit(): void {
    this.employeeForm= this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control('')
    });

    this.employeeManageService.getEmployee().subscribe((res) =>{
      for(let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay= this.employees;
    });
   
  }

  ngAfterViewInit(): void{
    // this.buttontemp.nativeElement.click();
  }

  addEmployee(){
    let employee: EmployeeManage={
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    }
    this.employeeManageService.postEmployee(employee).subscribe((res) =>{
      this.employees.unshift(res);
      this.clearForm();
    })
  }

  removeEmployee(event: any){
    this.employees.forEach((val, index)=>{
      if(val.id== parseInt(event)){
        this.employeeManageService.deleteEmployee(event).subscribe((res) =>{
          this.employees.splice(index, 1); 
        });                                                           
      }
    });
  }

  editEmployee(event: any){
    this.employees.forEach((val, ind)=>{
      if(val.id==event){
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  setForm(emp: EmployeeManage){
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.BirthDay.setValue(emp.birthdate);
    this.Gender.setValue(emp.gender);

    let educationIndex =0;
    this.educationOptions.forEach((val, index) => {
      if(val == emp.education) educationIndex = index;
    });
    this.Education.setValue(emp.education);
    this.Company.setValue(emp.company);
    this.Salary.setValue(emp.salary);
    this.fileInput.nativeElement.value='';
  }

  searchEmployees(event: any){
    let filteredEmployees: EmployeeManage[]=[];

    if(event==''){
      this.employeesToDisplay = this.employees;
    }else{
      filteredEmployees=this.employees.filter((vl,index)=>{
        let targetkey = vl.firstname.toLowerCase()+ '' +vl.lastname.toLowerCase();
        let searchkey = event.toLowerCase();
        return targetkey.includes(searchkey);
      });
      this.employeesToDisplay = filteredEmployees;
    }
  }

  clearForm(){
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.nativeElement.value='';
  }

  public get FirstName(): FormControl{
    return this.employeeForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl{
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get BirthDay(): FormControl{
    return this.employeeForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl{
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Education(): FormControl{
    return this.employeeForm.get('education') as FormControl;
  }
  public get Company(): FormControl{
    return this.employeeForm.get('company') as FormControl;
  }
  public get JobExperience(): FormControl{
    return this.employeeForm.get('jobExperience') as FormControl;
  }
  public get Salary(): FormControl{
    return this.employeeForm.get('salary') as FormControl;
  }
  
}
