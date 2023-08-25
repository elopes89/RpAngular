import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaciente } from 'IPaciente';
import { IUsuario } from 'IUsuario';
import { IVacina } from 'IVacina';
import { Observable, lastValueFrom } from 'rxjs';
import { IEndereco } from 'src/IEndereco';

@Injectable({
  providedIn: 'root'
})
export class CoronaVacService {
  boolEditar = false;
  pacientes: Array<IPaciente> = [];
  vacinas: Array<IVacina> = [];
  idVacina = 0;
  idDetail = 0;
  nomePagina = "";
  atvBotao = false;
  apiBase = "http://localhost:3000"
  constructor(private http: HttpClient) { }

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

  getIdPac(id: number): Observable<IPaciente> {
    return this.http.get<IPaciente>(`${this.apiBase}/paciente/${id}`)
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
    return lastValueFrom(this.http.post('http://localhost:3000/usuario', usuario));
  }

  sair() {
    localStorage.clear();
  }
}
