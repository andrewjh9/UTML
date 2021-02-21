// import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {Edge, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
// import {Position} from "../../assets/serialisation/position";
// import {LabelFormatter} from "../../assets/serialisation/label";
// import {AbstractEdgeComponent} from "../abstract-edge-component";
// import {EdgeRepositionService} from "../services/edge-reposition.service";
// import {SelectionService} from "../services/selection.service";
// import {Mode, ModeService} from "../services/mode.service";
//
// // @Component({
// //   selector: '[non-structural-edge]',
// //   templateUrl: '../edge/edge.component.html',
// //   styleUrls: ['../edge/edge.component.scss']
// // })
// export class NonStructuralEdgeComponent {
//   // @Input() edge?: Edge;
//   //
//   // constructor(private repositionService: EdgeRepositionService,
//   //             selectionService: SelectionService,
//   //             modeService: ModeService) {
//   //   super(selectionService, modeService);
//   // }
//   //
//   // public readonly hasLabels = false;
//   //
//   // public getStartLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
//   // public getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
//   // public getEndLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
//   // public getStartLabel(): string | undefined  { throw new Error("Undefined behavior")}
//   // public getMiddleLabel(): string | undefined  { throw new Error("Undefined behavior")}
//   // public getEndLabel(): string | undefined { throw new Error("Undefined behavior")}
//   // public setStartLabel(label: string) { throw new Error("Undefined behavior") }
//   // public setMiddleLabel(label: string) { throw new Error("Undefined behavior") }
//   // public setEndLabel(label: string) { throw new Error("Undefined behavior") }
//   //
//   // public handleMouseDown(event: MouseEvent) {
//   //   if (this.mode === Mode.Move) {
//   //     if (this.formatter) {
//   //       // todo: fix mouse positioning.
//   //       this.repositionService.activate(new Position(event.pageX, event.pageY), undefined, this.formatter);
//   //     }
//   //   } else if (this.mode === Mode.Select) {
//   //     if (this.formatter === undefined) {
//   //       throw new Error("Somehow you are clicking a non-structural edge which does not have a formatter");
//   //     }
//   //     this.selectionService.setEdgeFormatter(this.formatter);
//   //   }
//   // }
//   //
//   // ngOnDestroy(): void {
//   //   console.log("Nonstructured edge component is being destroyed.")
// }
