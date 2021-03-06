
import EventsEmitter from 'EventsEmitter'
import ContextMenu from 'ContextMenu'

export default class DataContextMenu extends
  EventsEmitter.Composer (Autodesk.Viewing.UI.ObjectContextMenu) {

  /////////////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////////////
  constructor (opts) {

    super (opts)

    this.contextMenu = new ContextMenu(opts)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  buildMenu (event, node) {

    var menu = []

    switch (node.type) {

      case 'hubs':

        menu.push({
          title: 'Show details',
          className: 'fa fa-share',
          target: [{
            title: 'Hub details',
            className: 'fa fa-cloud',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'hubs'
              })
            }
          }, {
            title: 'Projects details',
            className: 'fa fa-folder',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'hubs.projects'
              })
            }
          }]
        })

        break

      case 'projects':

        menu.push({
          title: 'Show details',
          className: 'fa fa-share',
          target: [{
            title: 'Project details',
            className: 'fa fa-clone',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'projects'
              })
            }
          }, {
            title: 'Root folder details',
            className: 'fa fa-folder',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'folders'
              })
            }
          }, {
            title: 'Root folder content',
            className: 'fa fa-folder-open',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'folders.content'
              })
            }
          },{
            title: 'Top folder content',
            className: 'fa fa-folder-open',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'top.folders.content'
              })
            }
          }]
        })

        //menu.push({
        //  title: 'Create new folder',
        //  className: 'fa fa-plus',
        //  target: () => {
        //    this.emit('context.folder.create', {
        //      event, node
        //    })
        //  }
        //})

        break

      case 'folders':

        menu.push({
          title: 'Show details',
          className: 'fa fa-share',
          target: [{
            title: 'Folder details',
            className: 'fa fa-folder',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'folders'
              })
            }
          }, {
            title: 'Folder content',
            className: 'fa fa-folder-open',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'folders.content'
              })
            }
          }]
        })

        //menu.push({
        //  title: 'Create new folder',
        //  className: 'fa fa-plus',
        //  target: () => {
        //    this.emit('context.folder.create', {
        //      event, node
        //    })
        //  }
        //})

        break

      case 'items':

        menu.push({
          title: 'Show item details',
          className: 'fa fa-file-text',
          target: () => {
            this.emit('context.details', {
              event, node, type: 'items'
            })
          }
        })

        if (node.viewerUrn) {

          menu.push({
            title: 'Show manifest',
            className: 'fa fa-cubes',
            target: () => {
              this.emit('context.details', {
                event, node, type: 'items.manifest'
              })
            }
          })
        }

        break
    }

    return menu
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  show (event, node) {

    var menu = this.buildMenu(event, node)

    if (menu && 0 < menu.length) {

      this.contextMenu.show(event, menu)
    }
  }
}
