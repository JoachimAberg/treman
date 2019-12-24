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

  public tarning1 = 1;
  public tarning2 = 1;
  constructor(private tremanService: TremanService) {
    tremanService.spelare.subscribe(s => {
      this.spelare = s;
    });
    tremanService.treman.subscribe(t => {
      this.treman = t;
    });
  }

  ngOnInit() {}
  public laggTillSpelare() {
    this.tremanService.laggTill();
  }

  public rulla() {
    this.tarning1 = Math.floor(Math.random() * 6) + 1;
    this.tarning2 = Math.floor(Math.random() * 6) + 1;
    this.tremanService.nastaSpelare();
  }
}
