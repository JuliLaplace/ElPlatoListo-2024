import { Injectable } from '@angular/core';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';
import { addDoc, collection, collectionData, deleteDoc, Firestore, getDocs, limit, orderBy, query, QueryFieldFilterConstraint, QueryOrderByConstraint, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface UsuarioPush {
  email: string,
  rol: TipoUsuario,
  token: string,
}



@Injectable({
  providedIn: 'root'
})
export class DataUsuariosPushService {
  private readonly table: string = 'users';
  public usuarios: UsuarioPush[] = [];

  constructor(private firestore: Firestore) {
    this.obtenerTodos();
  }
  
  async pushOrUpdateOne(usuario: UsuarioPush): Promise<void> {
    let userCheck: UsuarioPush[] = this.usuarios.filter((u) => { return u.email == usuario.email });
    if (userCheck.length > 0){
      this.updateOne(this.table, where('email', '==', usuario.email), { token: usuario.token });
    } else {
      this.fetchOne(this.table, where('email', '==', usuario.email))
      .then((u: UsuarioPush | null) => {
        if (u == null) {
          this.pushOne(this.table, usuario); 
        }
      });
    }
  }

  private async obtenerTodos(): Promise<void> {
    this.fetchAll(this.table, orderBy('rol', 'asc'))
    .subscribe((res: UsuarioPush[]) => { this.usuarios = res; });
  }

  public async fetchTokenByEmail(email: string): Promise<string> {
    let token = '';
    let res: UsuarioPush = await this.fetchOne(this.table, where('email', '==', email));
    if (res && res.token) {
      token = res.token;
    }
    return token;
  }



/////////// Gestion tabla
  private async pushOne(table: string, object: any): Promise<void> {
    let dataCollection = collection(this.firestore, table);    
    await addDoc(dataCollection, object);
  }


  private fetchAll(table: string, order: QueryOrderByConstraint): Observable<any> {
    let col = collection(this.firestore,table);
    const sortedQuery = query(col, order);
    const observable = collectionData(sortedQuery);
    return observable;
  }
  

  private async fetchOne(table: string, where: QueryFieldFilterConstraint): Promise<any> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(col, where, limit(1));
    const querySnapshot = await getDocs(fetchQuery);
    return querySnapshot.docs[0]?.data();
  }

  private async updateOne(table: string, where: QueryFieldFilterConstraint, data: any): Promise<void> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(col, where, limit(1));
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, data);
    });
  }
}
