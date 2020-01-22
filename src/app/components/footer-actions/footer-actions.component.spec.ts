import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterActionsComponent } from './footer-actions.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('FooterActionsComponent', () => {
  let component: FooterActionsComponent;
  let fixture: ComponentFixture<FooterActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterActionsComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a divider', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-divider')).toBeTruthy();
  });
});
