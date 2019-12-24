import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Spelare } from "./spelare";

@Injectable({
  providedIn: "root"
})
export class TremanService {
  private spelareLista: Spelare[] = [];
  private spelareBS: BehaviorSubject<Spelare[]>;
  private aktivSpelareBS: BehaviorSubject<Spelare>;
  private tremanBS: BehaviorSubject<Spelare>;

  public get spelare(): Observable<Spelare[]> {
    return this.spelareBS.asObservable();
  }
  public get aktivSpelare(): Observable<Spelare> {
    return this.aktivSpelareBS.asObservable();
  }
  public get treman(): Observable<Spelare> {
    return this.tremanBS.asObservable();
  }
  constructor() {
    this.spelareBS = new BehaviorSubject([]);
    this.aktivSpelareBS = new BehaviorSubject(null);
    this.tremanBS = new BehaviorSubject(null);
  }

  public laggTill() {
    const nySpelare = new Spelare();

    if (this.spelareLista.length === 0) {
      this.aktivSpelareBS.next(nySpelare);
      this.tremanBS.next(nySpelare);
    }
    this.spelareLista.push(nySpelare);
    this.spelareBS.next(this.spelareLista);
  }
  public taBort(spelare: Spelare) {
    const listindex = this.spelareLista.indexOf(spelare);
    if (listindex !== -1) {
      if (this.tremanBS.value === spelare) {
        this.tremanBS.next(
          this.spelareLista[
            listindex === this.spelareLista.length - 1 ? 0 : listindex + 1
          ]
        );
      }
    }
    if (listindex !== -1) {
      if (this.aktivSpelareBS.value === spelare) {
        this.aktivSpelareBS.next(
          this.spelareLista[
            listindex === this.spelareLista.length - 1 ? 0 : listindex + 1
          ]
        );
      }
    }
    const splicad = this.spelareLista.splice(listindex, 1);
    this.spelareBS.next(this.spelareLista);
  }

  public nastaSpelare() {
    const index = this.spelareLista.indexOf(this.aktivSpelareBS.value);
    this.aktivSpelareBS.next(
      this.spelareLista[index === this.spelareLista.length - 1 ? 0 : index + 1]
    );
  }
}
