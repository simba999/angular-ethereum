import { Component, OnInit } from '@angular/core';
import { Item, Rarity } from '../../shared/models/item.model';
import { ItemService } from '../../shared/services/ItemService/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ParamMap } from '@angular/router/src/shared';
import { state } from '@angular/animations';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  items: Item[];
  detailItem$: Observable<Item>;
  detailItem: Item;
  itemArray: Item[];
  counter = 0;
  typeImages = [];

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(res => {
      this.itemArray = res;
      this.items = res.slice(0, 5);
    });
    this.detailItem$ = this.route.paramMap
      .switchMap((params: ParamMap) => this.itemService.getItem(params.get('id')));
    this.detailItem$.subscribe(item => {
      this.detailItem = item;
      this.setItemRarity(item.meta.rarity);
    });
  }

  setItemRarity(rarity: string) {
    const types = ['common', 'rare', 'insane', 'legendary', 'unfathomable'];
    let url = '';
    types.map(type => {
      if (type.toLocaleLowerCase() === rarity.toLocaleLowerCase()) {
        url = `/assets/images/img-item-type-${type}.png`;
      } else {
        url = `/assets/images/img-item-type-${type}-disabled.png`;
      }
      this.typeImages.push(url);
    });
  }

  loadNextWeapons() {
    if (this.counter < this.itemArray.length - 5) {
      this.items = this.itemArray.slice(this.counter, this.counter + 5);
      this.counter += 1;
    }
  }
}
