import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaciente } from 'IPaciente';
import { IUsuario } from 'IUsuario';
import { IVacina } from 'IVacina';
import { Observable, lastValueFrom } from 'rxjs';
import { IEndereco } from 'src/IEndereco';
import { IDash } from '../component/dash/IDash';

@Injectable({
  providedIn: 'root'
})
export class CoronaVacService {
  boolEditar = false;
  vacinas: Array<IVacina> = [];
  pacientes: Array<IPaciente> = [];
  dashArr: any;
  objDash = {
    id: 0,
    paciente: 0,
    vacina: 0
  }
  idVacina = 0;
  idDetail = 0;
  nomePagina = "";
  atvBotao = false;
  apiBase = "http://localhost:3000"
  constructor(private http: HttpClient) {
    this.BuscarDash()
  }

  getCep(cep: string): Observable<IEndereco> {
    return this.http.get<IEndereco>(`http://viacep.com.br/ws/${cep}/json`);
  }

  getAll(endpoint: string, t: any): Observable<typeof t[]> {
    return this.http.get<[]>(`${this.apiBase}/${endpoint}`)
  }

  add(usuario: any, t: any, endPoint: string): Observable<typeof t> {
    return this.http.post<typeof t>(`${this.apiBase}/${endPoint}`, usuario)
  }
  edit(usuario: any, id: number): Observable<IPaciente> {
    return this.http.put<IPaciente>(`${this.apiBase}/paciente/${id}`, usuario)
  }
  getId(id: number, endPoint: string, t: any): Observable<typeof t> {
    return this.http.get<typeof t>(`${this.apiBase}/${endPoint}/${id}`)
  }

  editDash(usuario: any, id: number): Observable<IDash> {
    return this.http.put<IDash>(`${this.apiBase}/dash/${id}`, usuario)
  }
  getDash(): Observable<IDash[]> {
    return this.http.get<IDash[]>(`${this.apiBase}/dash`)
  }

  BuscarDash() {
    this.getAll("paciente", this.pacientes).subscribe(pac => {
      this.pacientes = pac;
      this.objDash.paciente  = this.pacientes.length;
    })

    this.getAll("vacina", this.vacinas).subscribe(vac => {
      this.objDash.vacina = vac.length;
    })
  }


  atualizarDash() {
    this.BuscarDash()
    this.editDash(this.objDash, 0).subscribe((not) => {
      this.objDash.paciente;
      this.dashArr.push(not);
    })
  }



  del(id: number): Observable<IPaciente> {
    return this.http.delete<IPaciente>(`${this.apiBase}/paciente/${id}`)
  }

  async logar(usuario: { email: string, senha: string }) {
    const usuariosCadastrados = await this._obterUsuarios();
    for (const usuarioCadastrado of usuariosCadastrados) {
      const emailValido = usuarioCadastrado.email === usuario.email;
      const senhaValida = usuarioCadastrado.senha === usuario.senha;
      if (emailValido && senhaValida) {
        localStorage.setItem('usuario', JSON.stringify(usuarioCadastrado));
        const horario = new Date();
        horario.setMinutes(horario.getMinutes() + 30);
        const horarioString = horario.getTime().toString();
        localStorage.setItem('sessao', horarioString)
        return;
      }
    }
    throw new Error("Usuário não cadastrado!!");
  }

  private _obterUsuarios() {
    return lastValueFrom(this.http.get<IUsuario[]>('http://localhost:3000/usuario'));
  }


  verificarUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return false;

    const dataString = localStorage.getItem('sessao');
    if (dataString === null) throw new Error('data nula!!');
    const dataSessao = new Date(dataString).getTime();
    const dataAtual = new Date().getTime();
    const sessaoExpirada = dataAtual > dataSessao;
    if (sessaoExpirada) {
      this.sair();
      return false;
    }

    return true;
  }

  registrar(usuario: IUsuario) {
    return lastValueFrom(this.http.put(`http://localhost:3000/usuario/${0}`, usuario));
  }

  sair() {
    localStorage.clear();
  }


  formatarDataAtual() {
    const dataAtual = new Date();
    if (dataAtual.getMonth() >= 10)
      return `${dataAtual.getFullYear()}/${dataAtual.getMonth() + 1}/${dataAtual.getDate()}`;
    else
      return `${dataAtual.getFullYear()}/0${dataAtual.getMonth() + 1}/${dataAtual.getDate()}`;
  }


}
