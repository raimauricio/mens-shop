import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPanelComponent } from './products-panel.component';

describe('ProductsPanelComponent', () => {
  let component: ProductsPanelComponent;
  let fixture: ComponentFixture<ProductsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
