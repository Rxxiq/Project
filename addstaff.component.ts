import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.css']
})
export class AddstaffComponent implements OnInit {

  constructor(private service:ApiserviceService,  private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    //id for update
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid){
    this.service.getOnestaff(this.getparamid).subscribe((res)=>{

      console.log(res,'res==>');
      this.staffForm.patchValue({
        staffID:res.data[0].staffID,
        staffName:res.data[0].staffName,
        staffEmail:res.data[0].staffEmail,
        staffPhone:res.data[0].staffPhone,
        staffIntake:res.data[0].staffIntake,

      });
    });
  }
  }

  staffForm = new FormGroup({
    'staffID':new FormControl('',Validators.required),
    'staffName':new FormControl('',Validators.required),
    'staffEmail':new FormControl('',Validators.required),
    'staffPhone':new FormControl('',Validators.required),
    'staffIntake':new FormControl('',Validators.required)


  });

  //to create a new staff
  staffSubmit(){
    if(this.staffForm.valid){
      console.log(this.staffForm.value);
      this.service.createstaff( this.staffForm.value ).subscribe((res)=>{
        console.log(res,'res==>');
        this.staffForm.reset();
        this.successmsg = 'Add staff Profile Successful';
      });

    }
    else{
      this.errormsg = 'Add staff Profile Unsuccessful';
    }

  }
//to update a staff
staffUpdate()
{
  console.log(this.staffForm.value,'updatedform');

  if(this.staffForm.valid)
  {
    this.service.updatestaff(this.staffForm.value,this.getparamid).subscribe((res)=>{
      console.log(res,'resupdated');
      this.successmsg = res.message;

    })
  }
  else
  {
    this.errormsg = 'invalid';
  }
}
}
