import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { GenericService } from './generic.service';
import { AuthService } from '../shared/services/auth';
import { BaseForm } from '../shared/form';

@Component({
  selector: 'generic-detail-component',
  templateUrl: './generic-detail-component.html',
  styleUrls: ['./generic-detail-component.scss']
})
export class GenericDetailComponent extends BaseForm implements OnDestroy, OnInit {
  public config: any = {};
  public columns: any;
  public frm: FormGroup;
  public formErrors = {};
  public api;
  public onDetail = false;
  public paramSubscriber;

  public ngOnInit(): void {
    super.ngOnInit();
  }
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
    this.controlConfig = {
      id: new FormControl(''),
      Id: new FormControl(''),
      ..._.fromPairs(_.map(this.columns, (col) => [[col[0]],new FormControl('', [Validators.required])])),
    };
  }

  public loadData(id) {
    this.api.getDetailItem(id)
      .subscribe((resp) => {
        this.frm.patchValue(resp.Data || resp.data || resp);
      })
  }

  public save() {
    let model = this.frm.getRawValue();
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
