import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { GenericService } from './generic.service';
import { AuthService } from '../shared/services/auth';
import { BaseForm } from '../shared/form';

@Component({
  selector: 'generic-detail-component',
  templateUrl: './generic-detail-component.html',
  styleUrls: ['./generic-detail-component.scss']
})
export class GenericDetailComponent extends BaseForm implements OnDestroy {
  public config: any = {};
  public columns: any;
  public form: FormGroup;
  public formError = {};
  public api;
  public onDetail = false;
  public paramSubscriber;

  ngOnDestroy(): void {
    this.paramSubscriber && this.paramSubscriber.unsubscribe();
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private genericService: GenericService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    super();
    this.paramSubscriber = this.router.events.subscribe((params) => {
      // this.activeBlock = params['blockId'];
      if (params instanceof NavigationEnd) {
        let id = this.route.snapshot.params['id'];
        if (id) {
          this.onDetail = true;
          this.loadData(id);
        }
      }
    });
    this.config = this.route.snapshot.data['config'];
    this.api = this.genericService.getInstance(this.config.moduleName);
    this.columns = this.genericService.getColumns(this.config, true);
    this.form = this.formBuilder.group(
      {
        id: [''],
        Id: [''],
        ..._.fromPairs(_.map(this.columns, (col) => [col[0], ['', [Validators.required]]]))
      });
    this.form.valueChanges.subscribe(() => {
      this.onFormChanged();
    })
  }

  public loadData(id) {
    this.api.getDetailItem(id)
      .subscribe((resp) => {
        this.form.patchValue(resp.Data || resp.data || resp);
      })
  }

  public save() {
    let model = this.form.getRawValue();
    let subscription;
    if (model.id || model.Id) {
      subscription = this.api.patchItem(model.id || model.Id, model);
    } else {
      delete model.id;
      delete model.Id;
      subscription = this.api.postItem(model);
    }
    subscription.subscribe(() => {
      this.cancel();
    })

  }

  public cancel() {
    this.router.navigate(['auth', (this.config.path || this.config.moduleName), 'all']);
  }
}
