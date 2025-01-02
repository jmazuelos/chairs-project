import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { UpholsteryMaterialOption } from '../../../models/options';
import { MockUpholsteryService } from '../../../services/mock-upholstery.service';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairParts, ChairStore } from '../../../stores/chair.store';

@Component({
  selector: 'app-upholstery-grid',
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatGridListModule, MatCardModule],
  templateUrl: './upholstery-grid.component.html',
  styleUrl: './upholstery-grid.component.scss'
})
export class UpholsteryGridComponent {

  @Input() part!: string;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);
  readonly mockUpholsteryService = inject(MockUpholsteryService);

  upholsteryOptions!: UpholsteryMaterialOption[];

  ngOnInit(): void {
    this.loadUpholsteryOptions();
  }

  private loadUpholsteryOptions(): void {
    this.mockUpholsteryService.getUpholsteryOptions().subscribe((options) => {
      this.upholsteryOptions = options;
    });
  }

  // The chair part is related to mesh
  threejsPartMapping = new Map<ChairParts, string>([
    ['backrest', 'backrest'],
    ['headrest', 'headrest_pillow'],
    ['seat', 'seat'],
  ]);  
  
  changeUpholstery(upholsteryOption: UpholsteryMaterialOption, part: string): void {
    const threejsPart = this.threejsPartMapping.get(part as ChairParts);
    if (threejsPart) {
      this.threejsService.setUpholstery(threejsPart, upholsteryOption.name);
    }
    this.chairStore.updateUpholstery(upholsteryOption, part as ChairParts);
  }

  isSelectedOption(upholsteryOption: UpholsteryMaterialOption): boolean {
    return upholsteryOption.id === this.chairStore.getUpholstery(this.part as ChairParts)?.id;
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.getUpholsteryPrice(this.part as ChairParts);
  }
}