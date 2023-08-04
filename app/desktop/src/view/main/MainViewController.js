Ext.define('ModernTunes.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',

  requires: ['ModernTunes.view.Preview'],

  onShowPreview: function (record) {
    if (this.getView().down('video')) {
      return;
    }
    var videoConfig = {
      xtype: 'video',
      url: record.data.preview,
      posterUrl: record.data.image,
    };
    var linkConfig = {
      docked: 'bottom',
      xtype: 'component',
      tpl: [
        '<a href="{itunesstore}" target="itunes_store">',
        '<img src="app/desktop/src/view/main/resources/images/get-it-itunes.svg" style="margin: 16px; display: block; margin-left: auto; margin-right: auto; width: 75px;">',
        '</a>',
      ],
      data: {
        itunesstore: record.data.itunesstore,
      },
    };
    var containerConfig = {
      xtype: 'container',
      title: record.data.title + ' — ' + record.data.artist,
      style: '{background-color: black;}',
      layout: 'fit',
      items: [videoConfig, linkConfig],
    };
    var vid = Ext.create({
      xtype: 'preview',
      title: record.data.title,
      layout: 'fit',
      items: [containerConfig],
    });
    vid.show();
  },

  onThumbSelect: function (thumbs, record) {
    this.onShowPreview(record);
  },

  onGridSelect: function (grid, records) {
    this.onShowPreview(records[0]);
  },

  onAdd: function () {
    var dialog = Ext.create('Ext.Dialog', {
      title: 'Add a Tune',
      closable: true,
      width: 400,
      height: 300,
      layout: 'fit',
      items: [
        {
          xtype: 'formpanel',
          reference: 'form',
          layout: 'form',
          defaults: {
            xtype: 'textfield',
            labelAlign: 'top',
            required: true,
          },
          items: [
            {
              xtype: 'textfield',
              label: 'Artist',
              name: 'artist',
            },
            {
              xtype: 'textfield',
              label: 'Title',
              name: 'title',
            },
            {
              xtype: 'datefield',
              label: 'Release Date',
              name: 'release_date',
            },
          ],
          buttons: [
            {
              text: 'Save',
              handler: function () {
                var form = this.up('formpanel');
                var values = form.getValues();
                // validation
                if (!values.title || !values.artist || !values.release_date) {
                  Ext.Msg.alert('Error', 'All fields are required');
                  return;
                }
                var tunesStore =
                  Ext.ComponentQuery.query('mainview')[0].getViewModel();
                var newTune = Ext.create('ModernTunes.model.Tune', {
                  id: Math.floor(Math.random() * 10000000),
                  title: values.title,
                  image:
                    'app/desktop/src/view/main/resources/images/thumbnail-sample.jpg',
                  artist: values.artist,
                  itunesstore:
                    'https://itunes.apple.com/us/album/whatever-it-takes/1271045710?i=1271045720&uo=4',
                  preview: 'https://www.youtube.com/watch?v=BORDiMqyqRI',
                  release_date: Ext.Date.format(
                    new Date(values.release_date),
                    'M d, Y'
                  ),
                });
                // add the new record to the store
                tunesStore.getStore('tunes').add(newTune);
                // save the store
                tunesStore.getStore('tunes').sync();
                // close the dialog
                this.up('dialog').destroy();
              },
            },
            {
              text: 'Cancel',
              handler: function () {
                this.up('dialog').destroy();
              },
            },
          ],
        },
      ],
    });

    dialog.show();
  },

  onEdit: function () {
    var grid = Ext.ComponentQuery.query('mainview')[0].down('tunesgrid');
    var selection = grid.getSelection();
    if (selection) {
      var dialog = Ext.create('Ext.Dialog', {
        title: 'Edit a Tune',
        closable: true,
        width: 400,
        height: 300,
        layout: 'fit',
        items: [
          {
            xtype: 'formpanel',
            reference: 'form',
            layout: 'form',
            defaults: {
              xtype: 'textfield',
              labelAlign: 'top',
              required: true,
            },
            items: [
              {
                xtype: 'textfield',
                label: 'Artist',
                name: 'artist',
                value: selection.data.artist,
              },
              {
                xtype: 'textfield',
                label: 'Title',
                name: 'title',
                value: selection.data.title,
              },
              {
                xtype: 'datefield',
                label: 'Release Date',
                name: 'release_date',
                value: Ext.Date.format(
                  new Date(selection.data.release_date),
                  'Y-m-d'
                ),
              },
            ],
            buttons: [
              {
                text: 'Save',
                handler: function () {
                  var form = this.up('formpanel');
                  var values = form.getValues();
                  // validation
                  if (!values.title || !values.artist || !values.release_date) {
                    Ext.Msg.alert('Error', 'All fields are required');
                    return;
                  }
                  var tunesStore =
                    Ext.ComponentQuery.query('mainview')[0].getViewModel();
                  var newTune = Ext.create('ModernTunes.model.Tune', {
                    id: selection.data.id,
                    title: values.title,
                    image: selection.data.image,
                    artist: values.artist,
                    itunesstore: selection.data.itunesstore,
                    preview: selection.data.preview,
                    release_date: Ext.Date.format(
                      new Date(values.release_date),
                      'M d, Y'
                    ),
                  });
                  // add the new record to the store
                  tunesStore.getStore('tunes').add(newTune);
                  // save the store
                  tunesStore.getStore('tunes').sync();
                  // close the dialog
                  this.up('dialog').destroy();
                },
              },
              {
                text: 'Cancel',
                handler: function () {
                  this.up('dialog').destroy();
                },
              },
            ],
          },
        ],
      });
      dialog.show();
    }
  },

  onDelete: function () {
    var grid = Ext.ComponentQuery.query('mainview')[0].down('tunesgrid');
    var selection = grid.getSelection();
    if (selection) {
      Ext.Msg.confirm('Delete', 'Are you sure?', this.onDeleteConfirm, this);
    }
  },

  onDeleteConfirm: function (choice) {
    if (choice === 'yes') {
      var grid = Ext.ComponentQuery.query('mainview')[0].down('tunesgrid');
      var selection = grid.getSelection();
      var tunesStore = Ext.ComponentQuery.query('mainview')[0].getViewModel();
      tunesStore.getStore('tunes').remove(selection);
      tunesStore.getStore('tunes').sync();
    }
  },
});
