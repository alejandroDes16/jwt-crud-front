import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDTO } from '../models/change-password-dto';
import { EmailPasswordService } from '../service/email-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  tokenPassword: string;

  dto: ChangePasswordDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  onChangePassword(): void {
    if(this.password !== this.confirmPassword){
      this.toastService.error('Las contraseñas no coinciden', 'FAIL',{
        timeOut: 3000, positionClass:'toast-top-center'
      });
      return;
    }
    this.tokenPassword=this.activatedRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe(
      data => {
        this.toastService.success(data.mensaje, 'OK',{
            timeOut: 3000, positionClass:'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      err =>{
        this.toastService.error(err.error.mensaje, 'FAIL',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
      }
    )
  }

}
