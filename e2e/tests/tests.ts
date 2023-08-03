import { Selector } from 'testcafe';

fixture`App testing`
  .page('http://localhost:1841/');

const navGrid = Selector('#mainview').child('div').child('div').nth(1).child('div').child('div').nth(1);
const navThumbnails = Selector('#mainview').child('div').child('div').nth(1).child('div').child('div').nth(0);

test('Should show Grid view', async t => {
  await t
    .wait(2000)
    .click(navGrid)
    .wait(2000)
    .expect(Selector('div').withText('Artist').exists).ok()
});

test('Should show Thumbnails Preview modal', async t => {
  await t
    .wait(2000)
    .click(navThumbnails)
    .wait(2000)
    .click(Selector('#tunesview').find('figure').nth(0))
    .wait(2000)
    .expect(Selector('#preview').exists).ok();
});

test('Should show Grid Preview modal', async t => {
  await t
    .wait(2000)
    .click(navGrid)
    .wait(2000)
    .click(Selector('#tunesgrid').child('div').child('div').nth(2).child('div').child('div').nth(0))
    .wait(2000)
    .expect(Selector('#preview').exists).ok();
});