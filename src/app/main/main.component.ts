import { Component, OnInit } from "@angular/core";
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
      this.meddelande =
        this.aktivspelare.namn + "ska dela ut " + this.tarning1 + " klunkar!";
    } else if (this.tarning1 + this.tarning2 === 7) {
      nastaSpelare = false;
      const drickare = this.spelare[
        index === this.spelare.length - 1 ? 0 : index + 1
      ];
      this.meddelanderubrik = "Seven ahead";
      this.meddelande = drickare.namn + " ska ta en klunk!";
    } else if (this.tarning1 + this.tarning2 === 9) {
      nastaSpelare = false;
      const drickare = this.spelare[
        index === 0 ? this.spelare.length - 1 : index - 1
      ];
      this.meddelanderubrik = "Nine behind";
      this.meddelande = drickare.namn + " ska ta en klunk!";
    } else if (this.tarning1 + this.tarning2 === 11) {
      nastaSpelare = false;
      this.meddelanderubrik = "Finger på näsan";
      this.meddelande = "Sista spelaren ska ta en klunk!";
    }

    if(this.tarning1 === 3 || this.tarning2 ===3  || this.tarning1 + this.tarning2 ===3){
      nastaSpelare = false;
      if (this.tarning1 === 3 && this.tarning2 === 3 ) {
        this.tremanmeddelanderubrik = "2 treor";
        this.tremanmeddelande = this.treman.namn + " ska dricka 2 klunkar";
      }
      else {
        this.tremanmeddelanderubrik = "1 trea";
        this.tremanmeddelande = this.treman.namn + " ska dricka 1 klunk";

      }
    }

    if(nastaSpelare){
      this.meddelanderubrik = "Nästa spelare"
      if(this.bytTreman){
        this.tremanService.bytTreman();
      }
      this.bytTreman = false;
      this.tremanService.nastaSpelare();
    }
  }

  private nollstallMeddelanden(){
    this.tremanmeddelande = "";
    this.meddelande = "";
    this.tremanmeddelanderubrik = "";
    this.meddelanderubrik = "";

  }
}
