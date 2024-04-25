import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-updatestaff',
  templateUrl: './updatestaff.component.html',
  styleUrls: ['./updatestaff.component.css']
})

export class UpdatestaffComponent implements OnInit {

  staffForm = new FormGroup({
    'staffID':new FormControl('',Validators.required),
    'staffName':new FormControl('',Validators.required),
    'staffEmail':new FormControl('',Validators.required),
    'staffPhone':new FormControl('',Validators.required),
    'staffIntake':new FormControl('',Validators.required)


  });

  constructor(private service:ApiserviceService,  private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  message: boolean= false;

  ngOnInit(): void {

      this.service.getOnestaff(this.router.snapshot.params['id']).subscribe((res:any)=>{
        console.log(res,'res==>');
        this.staffForm.patchValue({
          staffID:res.data[0].staffID,
            staffName:res.data[0].staffName,
            staffEmail:res.data[0].staffEmail,
            staffPhone:res.data[0].staffPhone,
            staffIntake:res.data[0].staffIntake

        });
      });
  }
//to update a staff
staffUpdate()
{
  console.log(this.staffForm.value);
    this.service.updatestaff(this.router.snapshot.params['id'], this.staffForm.value).subscribe((result:any)=>{

    this.staffForm.reset();
    this.successmsg = 'Profile successfully updated';
    this.message = true;

    });
  }
removeMessage(){
  this.message = false;
}
}
