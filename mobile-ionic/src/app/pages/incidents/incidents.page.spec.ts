import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncidentsPage } from './incidents.page';

describe('IncidentsPage', () => {
  let component: IncidentsPage;
  let fixture: ComponentFixture<IncidentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
