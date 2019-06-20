import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService;
  let compiled;
  let dataService;
  let spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user component', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);

    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('it should display the user name, if the user is logged in', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.isloggedIn = true;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  });

  it('it shouldn\'t display the user name, if the user is logged in', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  });

  it('It shouldn\'t fetch data successfully if not called asynchronously ', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });

  it('It should fetch data successfully if called asynchronously ', async(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then((() => {
      expect(component.data).toBe('Data');
    }));
  }));


  it('It should fetch data successfully if called asynchronously Alternative Way using fakeAsync', fakeAsync(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('Data');
  }));




});
