import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subsidiary } from '../_model/subsidiary';
import { SubsidiaryService } from '../_service/subsidiary.service';

@Component({
  selector: 'app-edit-subsidiary',
  templateUrl: './edit-subsidiary.component.html'
})
export class EditSubsidiaryComponent implements OnInit {
  subsidiary: BehaviorSubject<Subsidiary> = new BehaviorSubject<Subsidiary>({} as Subsidiary);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subsidiaryService: SubsidiaryService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.subsidiaryService.getSubsidiary(id!).subscribe((subsidiary) => {
      this.subsidiary.next(subsidiary);
    });
  }

  editSubsidiary(subsidiary: Subsidiary) {
    this.subsidiaryService.updateSubsidiary(this.subsidiary.value._id!.toString(), subsidiary)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert('Failed to update car instance.');
          console.error(error);
        }
      })
  }

  handleCancel() {
    this.router.navigate(['/home']);
  }
}
