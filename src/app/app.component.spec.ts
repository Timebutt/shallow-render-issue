import { fakeAsync, tick } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

declare var Zone: any;

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(async () => {
    shallow = new Shallow(AppComponent, AppModule);
  });

  it('should create the app', fakeAsync(async () => {
    await Promise.resolve();

    // FakeAsyncTestZoneSpec properly defined
    console.log(Zone.current.get('FakeAsyncTestZoneSpec'));

    // No problem here
    tick(1000);
  }));

  it('should create the app', fakeAsync(async () => {
    // FakeAsyncTestZoneSpec still defined before running shallow.render()
    console.log(Zone.current.get('FakeAsyncTestZoneSpec'));

    await shallow.render();

    // FakeAsyncTestZoneSpec no longer defined after running shallow.render()
    console.log(Zone.current.get('FakeAsyncTestZoneSpec'));

    // This now throws an error
    tick(1000);
  }));
});
