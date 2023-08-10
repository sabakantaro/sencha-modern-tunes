Ext.define('ModernTunes.view.TunesGrid', {
  extend: 'Ext.grid.Grid',
  xtype: 'tunesgrid',
  id: 'tunesgrid',
  cls: 'tunes-grid',
  requires: ['Ext.grid.column.Column', 'Ext.grid.cell.*'],
  defaults: {
    height: 54,
  },

  items: [
    {
      xtype: 'toolbar',
      docked: 'top',
      defaults: {
        margin: '0 10 0 0',
      },
      items: [
        {
          xtype: 'component',
          html: '<h3>Grid</h3>',
          cls: 'title',
        },
        {
          xtype: 'spacer',
        },
        {
          xtype: 'button',
          iconCls: 'x-fa fa-plus',
          handler: 'onAdd',
        },
        {
          xtype: 'button',
          iconCls: 'x-fa fa-edit',
          handler: 'onEdit',
        },
        {
          xtype: 'button',
          iconCls: 'x-fa fa-trash',
          handler: 'onDelete',
        },
        {
          xtype: 'button',
          iconCls: 'x-fa fa-sync',
          handler: 'onRefresh',
        },
      ],
    },
  ],

  columns: [
    {
      text: 'Artist',
      dataIndex: 'artist',
      flex: 1,
    },
    {
      text: 'Title',
      dataIndex: 'title',
      flex: 1,
    },
    {
      text: 'Release Date',
      dataIndex: 'release_date',
      flex: 0.5,
    },
    {
      text: 'Thumbnail',
      dataIndex: 'image',
      tpl: '<div class="grid-image" style="background-image:url(\'{image}\')"></div>',
      cell: {
        encodeHtml: false,
      },
    },
  ],
});
