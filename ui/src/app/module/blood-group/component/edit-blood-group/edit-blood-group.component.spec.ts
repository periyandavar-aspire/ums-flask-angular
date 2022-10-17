import { ToastService } from './../../../../shared/service/toast.service';
import { BloodGroupService } from './../../service/blood-group.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBloodGroupComponent } from './edit-blood-group.component';
import { ActivatedRouteStub, RouterLinkDirectiveStub } from '../../../../test/test-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MockBloodGroupService } from '../../../../test/mocks/blood-group-service.mock';
import { By } from '@angular/platform-browser';

describe('EditBloodGroupComponent', () => {
  let component: EditBloodGroupComponent;
  let fixture: ComponentFixture<EditBloodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBloodGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBloodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let component: EditBloodGroupComponent;
let fixture: ComponentFixture<EditBloodGroupComponent>;

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

fdescribe('BloodGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBloodGroupComponent, RouterLinkDirectiveStub],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: BloodGroupService, useClass: MockBloodGroupService },
        { provide: ToastService, useValue: toaster },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBloodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', () => {
    const value = fixture.nativeElement.querySelector('#blood_group_value');
    
    value.value = 'samp';
    expect(fixture.componentInstance.formGroup.invalid).toBe(true);

    value.value = 'A+';
    expect(fixture.componentInstance.formGroup.invalid).toBe(false);

    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    // fixture.componentInstance.register();
    fixture.detectChanges();
    expect(toaster.showToast).toHaveBeenCalled();
    // fixture.detectChanges();

    // expect(window.alert).toHaveBeenCalled();
  });
});
