import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['idUser']
    this.findByIdUser(this.idUser)

  }

  confirmSenha(event: any){

  }

  tipoUser(event: any){

  }

  atualizar(){

    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha)
    {
      alert('As senhas estão incorretas')
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        alert('Usuário atualizado com sucesso!!!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0


        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }
}
