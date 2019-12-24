import { Component, OnInit, Input } from "@angular/core";
import { Spelare } from "../spelare";
import { TremanService } from "../treman.service";

@Component({
  selector: "treman-spelare",
  templateUrl: "./spelare.component.html",
  styleUrls: ["./spelare.component.scss"]
})
export class SpelareComponent implements OnInit {
  constructor(private treman: TremanService) {}

  @Input()
  public spelare: Spelare;

  public edit = true;
  public aktiv = false;

  ngOnInit() {
    this.treman.aktivSpelare.subscribe(as => {
      this.aktiv = this.spelare === as;
    });
  }

  tabortSpelare() {
    this.treman.taBort(this.spelare);
  }
}
