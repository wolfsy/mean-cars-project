import { Component, OnInit } from '@angular/core';
import { Subsidiary } from '../_model/subsidiary';
import { SubsidiaryService } from '../_service/subsidiary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subsidiaries-list',
  templateUrl: './subsidiaries-list.component.html',
  styleUrls: ['./subsidiaries-list.component.css']
})

export class SubsidiariesListComponent implements OnInit {
  subsidiaries$: Observable<Subsidiary[]> = new Observable();
 
  constructor(private subsidiariesService: SubsidiaryService) { }
  
  ngOnInit(): void {
    this.fetchSubsidiaries();
  }
  
  deleteSubsidiary(id: string): void {
    this.subsidiariesService.deleteSubsidiary(id).subscribe({
      next: () => this.fetchSubsidiaries()
    });
  }
  
  private fetchSubsidiaries(): void {
    this.subsidiaries$ = this.subsidiariesService.getSubsidiaries();
  }
}
