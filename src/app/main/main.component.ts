import { Component, OnInit, HostListener } from "@angular/core";
import { TremanService } from "../treman.service";
import { Spelare } from "../spelare";

@Component({
  selector: "treman-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  public spelare: Spelare[] = [];
  public treman: Spelare = null;
  public aktivspelare: Spelare = null;

  public tarning1 = 1;
  public tarning2 = 1;
  public tremanmeddelanderubrik = "";
  public tremanmeddelande = "";
  public meddelanderubrik = "";
  public meddelande = "";
  public bytTreman = false;
  public valtTreman = false;
  public delaUt = false;
  public antalAttDelaUt: number;

  private nastaTreman: Spelare = null;

  constructor(private tremanService: TremanService) {
    tremanService.spelare.subscribe(s => {
      this.spelare = s;
    });
    tremanService.treman.subscribe(t => {
      this.treman = t;
    });
    tremanService.aktivSpelare.subscribe(s => {
      this.aktivspelare = s;
    });
  }

  ngOnInit() {}
  public laggTillSpelare() {
    this.tremanService.laggTill();
  }

  public rulla() {
    this.nollstallMeddelanden();

    this.tarning1 = Math.floor(Math.random() * 6) + 1;
    this.tarning2 = Math.floor(Math.random() * 6) + 1;

    const index = this.spelare.indexOf(this.aktivspelare);
    let nastaSpelare = true;

    if (this.tarning1 === this.tarning2) {
      nastaSpelare = false;
      this.meddelanderubrik = "Två " + this.tarning1 + ":or";
      this.meddelande ="";
      this.delaUt = true;
      this.antalAttDelaUt = this.tarning1;
    } else if (this.tarning1 + this.tarning2 === 7) {
      nastaSpelare = false;
      const drickare = this.spelare[
        index === this.spelare.length - 1 ? 0 : index + 1
      ];
      this.meddelanderubrik = "Seven ahead";
      this.meddelande = drickare.namn + " ska ta en klunk!";
      drickare.klunkar++;
    } else if (this.tarning1 + this.tarning2 === 9) {
      nastaSpelare = false;
      const drickare = this.spelare[
        index === 0 ? this.spelare.length - 1 : index - 1
      ];
      this.meddelanderubrik = "Nine behind";
      this.meddelande = drickare.namn + " ska ta en klunk!";
      drickare.klunkar++;
    } else if (this.tarning1 + this.tarning2 === 11) {
      nastaSpelare = false;
      this.meddelanderubrik = "Finger på näsan";
      this.meddelande = "Sista spelaren ska ta en klunk!";
      this.antalAttDelaUt = 1;
      this.delaUt = true;
    }

    if (this.tarning1 === 3 || this.tarning2 === 3) {
      if (this.aktivspelare === this.treman && !this.valtTreman) {
        this.bytTreman = true;
      }

      nastaSpelare = false;
      if (this.tarning1 === 3 && this.tarning2 === 3) {
        this.tremanmeddelanderubrik = "Treor till treman";
        this.tremanmeddelande = this.treman.namn + " ska dricka 2 klunkar";
        this.treman.klunkar = this.treman.klunkar + 2;
      } else {
        this.tremanmeddelanderubrik = "Trea till treman";
        this.tremanmeddelande = this.treman.namn + " ska dricka 1 klunk";
        this.treman.klunkar++;
      }
    } else if (this.tarning1 + this.tarning2 === 3) {
      nastaSpelare = false;
      this.tremanmeddelanderubrik = "Trea till treman";
      this.tremanmeddelande = this.treman.namn + " ska dricka 1 klunk";
      this.treman.klunkar++;
    }
    if (nastaSpelare) {
      if (this.bytTreman) {
        this.tremanService.bytTreman(this.nastaTreman);
      }
      this.nollstallMeddelanden();
      this.meddelanderubrik = "Nästa spelare";
      this.valtTreman = false;
      this.bytTreman = false;
      this.tremanService.nastaSpelare();
    }
  }

  public bytTremanTill(s: Spelare) {
    this.valtTreman = true;
    this.nastaTreman = s;
    this.bytTreman = true;
  }

  public delaUtTill(s: Spelare) {
    s.klunkar = s.klunkar ++;
    this.antalAttDelaUt--;
    if(this.antalAttDelaUt === 0){
      this.delaUt = false;
      this.nollstallMeddelanden();
    }
  }

  private nollstallMeddelanden() {
    this.tremanmeddelande = "";
    this.meddelande = "";
    this.tremanmeddelanderubrik = "";
    this.meddelanderubrik = "";
  }

  @HostListener("document:keyup", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      // tslint:disable-next-line
      !(event.target["nodeName"] === "INPUT") &&
      this.spelare.length > 1 &&
      (!this.bytTreman || this.valtTreman) &&
      !this.delaUt
    ) {
      if (event.code === "Space") {
        this.rulla();
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
}
