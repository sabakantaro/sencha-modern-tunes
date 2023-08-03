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
    Ext.create('Ext.Dialog', {
      title: 'Add a Tune',
      closable: true,
      width: 500,
      height: 400,
      layout: 'fit',
      items: [
        {
          xtype: 'formpanel',
          reference: 'form',
          layout: 'form',
          items: [
            {
              xtype: 'textfield',
              fieldLabel: 'ID',
              name: 'id',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Title',
              name: 'title',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Image',
              name: 'image',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Artist',
              name: 'artist',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'iTunes Store',
              name: 'itunesstore',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Preview',
              name: 'preview',
            },
            {
              xtype: 'datefield',
              fieldLabel: 'Release Date',
              name: 'release_date',
            },
          ],
          buttons: [
            {
              text: 'Save',
              handler: function () {
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
    }).show();
  },

  onEdit: function () {
    Ext.create('Ext.Dialog', {
      title: 'Edit a Tune',
      closable: true,
      width: 500,
      height: 400,
      layout: 'fit',
      items: [
        {
          xtype: 'formpanel',
          reference: 'form',
          layout: 'form',
          items: [
            {
              xtype: 'textfield',
              fieldLabel: 'ID',
              name: 'id',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Title',
              name: 'title',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Image',
              name: 'image',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Artist',
              name: 'artist',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'iTunes Store',
              name: 'itunesstore',
            },
            {
              xtype: 'textfield',
              fieldLabel: 'Preview',
              name: 'preview',
            },
            {
              xtype: 'datefield',
              fieldLabel: 'Release Date',
              name: 'release_date',
            },
          ],
          buttons: [
            {
              text: 'Save',
              handler: function () {
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
    }).show();
  },
  onDelete: function () {
    Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
  },
});
