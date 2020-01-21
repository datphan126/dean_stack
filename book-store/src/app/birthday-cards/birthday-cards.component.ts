import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { BirthdayCardDetailDialogComponent } from '../birthday-card-detail-dialog/birthday-card-detail-dialog.component';

export interface Card {
  _id: string; title: string; material: string; price: number; picture: string;
}

@Component({
  selector: 'app-birthday-cards',
  templateUrl: './birthday-cards.component.html',
  styleUrls: ['./birthday-cards.component.css']
})
export class BirthdayCardsComponent implements OnInit {
  private cards: Array<Card>;
  private cardsObject: {
    [id: string]: Card;
  };

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.fetchBirthdayCards().subscribe((data: Array<Card>) => {
      this.cards = data;
      // Transfer the card array to an object to speed up the look up
      this.cardsObject = this.cards.reduce((obj, card) => {
        obj[card._id] = card;
        return obj;
      }, {});
    });
  }

  openDialog(id: string): void {
    this.dialog.open(BirthdayCardDetailDialogComponent, {
      width: '350px',
      data: this.cardsObject[id]
    });
  }

  delete(id: string): void {
    // Remove the book data from two internal data sources
    delete this.cardsObject[id];
    this.cards = this.cards.filter((card) => card._id != id);
    this.apiService.deleteBirthdayCard(id).subscribe();
  }
}
